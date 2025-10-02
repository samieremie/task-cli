# task-cli

Simple task tracker program with a cli

## Guide on how to use

To use the program first make sure the counter.json and data.json files are not present in the folder.
If they are present delete them with following command:

```
rm counter.json data.json
```

Then run following command inside the folder:

```
npm link
```

Now you can use the program with following commands:

```
# Add a new task
track-cli add 1 "example task"

# Delete or remove a task
track-cli delete 1
track-cli update 1 "updated task"

# Change the status of a task
track-cli mark-in-progress 1
track-cli mark-done 1
track-cli mark-todo 1

# List all tasks
track-cli list

# List tasks based on status
track-cli list done
track-cli list todo
track-cli list in-progress
```
