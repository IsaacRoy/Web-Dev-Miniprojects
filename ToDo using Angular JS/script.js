function TodoController($scope) {
 
  tasks = [];
  $scope.tasks = tasks;
  // Function to add a new task
  $scope.addTask = function() {
    if ($scope.newTask) {
      $scope.tasks.push($scope.newTask); // Add the task to the list
      $scope.newTask = ""; // Clear the input field
    }
  };

  // Function to remove a task
  $scope.removeTask = function(index) {
    $scope.tasks.splice(index, 1); // Remove the task at the given index
  };
};
