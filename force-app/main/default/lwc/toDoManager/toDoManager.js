import { LightningElement, track } from 'lwc';

export default class ToDoManager extends LightningElement 
{
    time="8:30 PM"
    greeting="Good evening"
    @track todos = [] //track decorator is required for arrays/objects

    connectedCallback()
    {
        this.getTime()

        // Time doesn't get updated unless page is refreshed. This problem is solved with a timer.
        setInterval(() => 
        {
            this.getTime()
        }, 1000*60) 
    }

    getTime()
    {
        const date = new Date()
        const hour = date.getHours()
        const min = date.getMinutes()

        this.time = `${this.getHour(hour)}:${this.getDoubleDigit(min)} ${this.getMidDay(hour)}`
        
        this.setGreeting(hour)
    }

    getHour(hour) //Hour converted from 24 hour to 12 hour format
    {
        return hour === 0 ? 12 : hour > 12 ? (hour-12) : hour
    }

    getMidDay(hour)
    {
        return hour>=12?"PM":"AM"
    }

    getDoubleDigit(digit)
    {
        return digit<10?"0"+digit:digit
    }

    setGreeting(hour)
    {
        if(hour<12)
            this.greeting="Good morning"
        else if(hour>=12 && hour<17)
            this.greeting="Good afternoon"
        else this.greeting="Good evening"
    }

    addTodoHandler()
    {
        //Select element by class (by id doesnt work in LWC). You can also select by element.
       // const inputBox = this.template.querySelector("lightning-input") 
        const inputBox = this.template.querySelector(".taskInput") 
        
        const todo = {
            todoId: this.todos.length,
            todoName: inputBox.value,
            done: false,
            todoDate: new Date()
        }

        this.todos.push(todo)
        
        console.log('Todos: ', this.todos)
    }

    get upcomingTasks()
    {
        return this.todos.filter(todo=>!todo.done)
    }

    get completedTasks()
    {
        return this.todos.filter(todo=>todo.done)
    }
}