const Task = require('../models/Task')

// CREATE TASK
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body

    const task = await Task.create({
      title,
      description,
      createdBy: req.user.id,
    })

    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// GET ALL TASKS (user sees only their tasks)
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.id })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// UPDATE TASK
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user.id,
    })

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    task.title = req.body.title || task.title
    task.description = req.body.description || task.description
    await task.save()

    res.json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// DELETE TASK
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id,
    })

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.json({ message: 'Task deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
