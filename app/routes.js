var mongoose = require('mongoose'),
    schema = new mongoose.Schema({
        text: String,
        done: Boolean
    }),
    Todo = mongoose.model('Todo', schema);


module.exports = function (app) {
    app.get('/api/todos', function (req, res) {
        Todo.find(function (err, todos) {
            if (err)
                res.send(err);

            res.json(todos);
        });
    });

    app.post('/api/todos', function (req, res) {
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);
            Todo.find(function (err, todos) {
                if (err)
                    res.send(err);
                console.log(res);
                res.json(todos);
            });
        });

    });

    app.delete('/api/todos/:todo_text', function (req, res) {
        Todo.remove({
            text: req.params.todo_text
        }, function (err, todo) {
            if (err)
                res.send(err);

            Todo.find(function (err, todos) {
                if (err)
                    res.send(err);
                res.json(todos);
            });
        });
    });

    app.put('/api/todos/:todo_text', function (req, res) {
        Todo.update({
                text: req.params.todo_text
            },
            {
                text: req.body.text
            }, function (err, todos) {
                if (err)
                    res.send(err);
                res.json(todos);

            }
        );
    });
};