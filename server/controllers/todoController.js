import TodoModel from "../models/todoModel.js";

export const addTodo = async (req, res, next) => {
    try{
        const {text} = req.body;

        const todo = await TodoModel.create({
            todo: text,
            userId: req.user.userId,
        })

        const todos = await TodoModel.find({
            userId: req.user.userId            
        });

        res.status(201).send({
            success: true,
            todos
        })
    }catch(error){
        next(error);
    }
}


export const getTodos = async (req, res, next) => {
    try{
        const todos = await TodoModel.find({
            userId: req.user.userId
        });

        res.status(200).send({
            success: true,
            todos
        })
    }catch(error){
        next(error)
    }
}

export const completeTodo = async (req, res, next) => {
    try{
        const {id} = req.params;
        const todo = await TodoModel.findById(id);
        console.log(todo);
        todo.completed = !todo.completed;
        const completedTodo = await todo.save();

        const todos = await TodoModel.find({
            userId: req.user.userId            
        });       

        res.status(200).send({
            success: true,
            todos
        })

    }catch(error){
        mext(error);
    }
}

export const deleteTodo = async (req, res, next) => {
    try{
        const {id} = req.params;
        console.log(id)
        const deleteTodo = await TodoModel.findByIdAndDelete(id);

        const todos = await TodoModel.find({
            userId: req.user.userId
        });

        res.status(200).send({
            success: true,
            todos
        })
    }catch(error){
        next(error);
    }
}