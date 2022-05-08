import { LightningElement, track } from 'lwc';
import addTodo from "@salesforce/apex/ToDoController.addTodo"

export default class ToDoManager extends LightningElement 
{
    time="8:30 PM"
    greeting="Good evening"
    @track todos = [] //track decorator is required for arrays/objects

    connectedCallback()
    {
        this.getTime()

        this.populateTodos()

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
            todoName: inputBox.value,
            done: false,
            
        }

      //  this.todos.push(todo)
        
        addTodo({payload: JSON.stringify(todo)}).then(response => {
            console.log("Insertion successful")
        }).catch(error => {
            console.error("Failed to insert todo: ",error)
        })

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

    populateTodos()
    {
        const todosToAdd = 
        [
            {
                todoId: 0,
                todoName: "Wash the car",
                done: false,
                todoDate: new Date()
            },
            {
                todoId: 1,
                todoName: "Do laundry",
                done: false,
                todoDate: new Date()
            },
            {
                todoId: 2,
                todoName: "Water plants",
                done: false,
                todoDate: new Date()
            },
            {
                todoId: 3,
                todoName: "Charge powerbank",
                done: true,
                todoDate: new Date()
            },
        ]

        this.todos=todosToAdd
    }
}