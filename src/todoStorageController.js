export default function createTodoStorageController(){
    function storageAvailable(type) {
        let storage;
        try {
          storage = window[type];
          const x = "__storage_test__";
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
        } catch (e) {
          return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            storage &&
            storage.length !== 0
          );
        }
      }      
    function importData(){
        if(storageAvailable("localStorage")){
            const todos = JSON.parse(localStorage.getItem("todos"));
            return todos;
        }
        else{
            console.log("local storage not available");
        }
    }
    function saveTodos(projects){
        if(storageAvailable("localStorage")){
            localStorage.setItem("todos", JSON.stringify(projects));
        }
    }
    return {importData, saveTodos};
}