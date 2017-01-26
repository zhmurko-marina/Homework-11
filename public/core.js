$(document).ready(function () {
    var $mainList = $('#todoList');
    $('#addTask').on('click', function () {
        var $item = $('#todoInput').val();
        $.ajax({
            type: 'post',
            url: 'api/todos',
            data: {text: $item, done: false},
            cache: false,
            success: function (data) {
                var todo = data;
                if ($item) {
                    $('#todoList').append('<li class="row valign-wrapper" id=' + (todo.length - 1) + '>' +
                        '<p class="valign">' + $item + '</p>' +
                        '<button class="btn button-edit blue lighten-1">edit</button>' +
                        '<button class="btn button-delete pink darken-1">✕</button></li>');
                }
            }
        });
        countTasks();
    });
    function redraw() {
        $.ajax({
            type: 'GET',
            url: '/api/todos',
            cache: false,
            success: function (data) {
                tasks = data;
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i].done) {
                        $('#todoList').append('<li class="row valign-wrapper" id=' + i + '>' +
                            '<p class="valign checked">' + tasks[i].text + '</p>' +
                            '<button class="btn button-edit blue lighten-1">edit</button>' +
                            '<button class="btn button-delete pink darken-1">✕</button></li>');
                    }
                    else {
                        $('#todoList').append('<li class="row valign-wrapper" id=' + i + '>' +
                            '<p class="valign">' + tasks[i].text + '</p>' +
                            '<button class="btn button-edit blue lighten-1">edit</button>' +
                            '<button class="btn button-delete pink darken-1">✕</button></li>');
                    }
                }
            }
        });
        countTasks();
    }


    $('#todoInput').on('keyup', function (event) {
        if (event.keyCode == 13) {
            $('#addTask').click();
        }
    });

    $mainList.on('click', 'li p', function (e) {
        $(this).toggleClass('checked');
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].text == $(this).text() && $(this).hasClass('checked')) {
                tasks[i].done = true;
            }
            else if (tasks[i].taskValue == $(this).text()) {
                tasks[i].isChecked = false;
            }
        }
        // save();
        countTasks();
    });

    $mainList.on('click', '.button-delete', function (e) {
        var idd = event.target;
        $.ajax({
            type: 'delete',
            url: 'api/todos/' + $(idd).siblings('p').text()

        });
        $(this).parent().fadeOut('slow');

    });

    $mainList.on('click', '.button-edit', function (e) {
        var id = $(this).parent().attr('id');
        $('body').append('<div class="edit"><div id="edit">' +
            '<input id="editInput">' +
            '<button class="btn button-save blue lighten-1">save</button>' +
            '<button class="btn button-cancel pink darken-1">cancel</button>' +
            '</div></div>');
        var pp=$(this).siblings('p')[0].innerHTML;
        $('#editInput').val($(this).siblings('p')[0].innerHTML);

        $('#edit').on('click', '.button-cancel', function (event) {
            var $div = $(event.target).parent();
            $div.parent().remove();
        });

        $('#edit').on('click', '.button-save', function (event) {
            var $div = $(event.target).parent();
            // tasks[id].taskValue = $('#editInput').val();
            $('li#' + id + ' p').text($('#editInput').val());
            $.ajax({
                type: 'put',
                url: 'api/todos/' + pp +'/'+ $('#editInput').val(),
                data: {text: $('#editInput').val()},
                cache: false,
                success: function (data) {
                }
            });
            // save();
            $div.parent().remove();
        });

    });

    // $mainList.sortable({
    //     connectWith: $('#todoList'),
    //     update: function (event, ui) {
    //         var order = $(this).sortable('toArray');
    //         for (var i = 0; i < $('#todoList li').length; i++) {
    //             tasks[i].taskValue = $('#todoList li#' + order[i] + ' p').text();
    //             tasks[i].isChecked = $('#todoList li#' + order[i] + ' p').hasClass('checked') ? true : false;
    //         }
    //         // save();
    //     }
    // });

    function countTasks() {
        $('#countOfDone').text($('.checked').length);
        $('#countOfAll').text($('li').length);
        $('#countOfNotDone').text($('li').length - $('.checked').length);
    }

    redraw();
    countTasks();
});

