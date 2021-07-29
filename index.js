const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const path = require('path')
const PORT = process.env.PORT || 3000

const app = express();
// Настройка конфигурации для шаблонизатора
const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

// Функция куда передветься параметр extended со значенем тру
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)


async function start() {
    try {
        await mongoose.connect('mongodb+srv://Vlad:1q2w3e4r@cluster0.phcpz.mongodb.net/todo',{
            useNewUrlParser: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log('Server has been started...');
        })
    } catch (err) {
        console.log(err);
    }  
}


start()

