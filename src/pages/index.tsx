import checkTokenFirst from "@/middleware/auth"
import '../assets/index/style.less'
import ListToDo from "./todo/list";

export default function HomePage() {
  checkTokenFirst();

  return (

    <div className="row">

      <div className="form-create-post">
        <form action="">
          <h2>Add new post</h2>
          <div className="form-group">
            <label htmlFor=""></label>
            <textarea cols={20} rows={5} placeholder="Write your felling..." />
          </div>
          <div className="form-group">
            <label htmlFor="">Tags</label>
            <input type="text" />
          </div>
        </form>
      </div>
      <div>
        <ListToDo />
      </div>
    </div>
  );
}
