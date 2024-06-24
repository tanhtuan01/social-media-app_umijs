import checkTokenFirst from "@/middleware/auth"
import '../assets/index/style.less'
import ListToDo from "./todo/list";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { apiPost } from "@/api/post";
import { CloudOutlined, MessageOutlined, SendOutlined } from "@ant-design/icons";

export default function HomePage() {
  checkTokenFirst();

  const postAPI = apiPost();
  const create = postAPI.create
  const list = postAPI.getAll

  const [content, setContent] = useState('')
  const [tag, setTag] = useState('')
  const [listPost, setListPost] = useState([])
  const [commentsByPost, setCommentsByPost] = useState({});

  function submit() {

    if (content.trim().length == 0) {
      toast.error("You haven't written the content yet")
    } else {
      const post = {
        content: content,
        tag: tag
      }
      console.log(post)
      createContent(post)

    }
  }

  useEffect(() => {
    getAllPost()
  }, [])

  async function createContent(post: object) {

    const { error } = await create(post)
    if (error) {
      toast.error('Create post failed')

    } else {
      toast.success('Create post successfully')
    }

  }

  async function getAllPost() {
    const data = await list()
    console.log(data)
    setListPost(data)
  }

  const handleComment = (postId) => {
    if (commentsByPost[postId]?.trim() !== '') {
      // Gửi dữ liệu bình luận lên server hoặc thực hiện các tác vụ khác
      console.log(`Bình luận cho bài viết có id ${postId}: ${commentsByPost[postId]}`);
      setCommentsByPost((prevComments) => ({
        ...prevComments,
        [postId]: '',
      })); // Đặt lại nội dung bình luận về rỗng
    }
  };

  return (

    <div className="row">

      <ToastContainer autoClose={3000} />
      <div className="content">
        <div className="post">
          <div className="form-create-post">
            <form action="">
              <h2>Add new post</h2>
              <div className="form-group">
                <label htmlFor=""></label>
                <textarea cols={20} rows={5} placeholder="Write your felling..." value={content} onChange={event => setContent(event.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="">Tag</label>
                <input type="text" placeholder="Some description for your post..." value={tag} onChange={event => setTag(event.target.value)} />
              </div>
              <button onClick={submit} type="button" className="btn">Create</button>
            </form>
          </div>
          <div className="other-post">
            <h2 className="title">All Post</h2>

            {listPost.length > 0 ? (
              listPost.map((p) => (
                <div key={p._id} className="list-post">
                  <div className="post-item">
                    <div className="post-info">
                      <div className="author-date">
                        <div className="author">{p.name}</div>
                        <div className="post-date">
                          <small>2022-22-22</small>
                        </div>
                      </div>
                      <div className="post-content">
                        <pre>{p.content}</pre>
                      </div>
                      <div className="post-tag">
                        <span>
                          <small>{p.tag}</small>
                        </span>
                      </div>
                      <hr />
                      <div className="post-action">
                        <a>
                          <CloudOutlined />
                        </a>
                        <a>
                          <MessageOutlined />
                        </a>
                      </div>
                      <hr />
                      <div className="post-list-comment">


                        <div className="comment-item">
                          <div className="user-content">
                            <p className="user">Author:</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, laboriosam.</p>
                          </div>
                          <p>
                            <small>2222</small>
                          </p>
                        </div>

                      </div>
                      <div className="post-comment">
                        <form action="">
                          <textarea
                            name=""
                            id=""
                            value={commentsByPost[p._id] || ''}
                            onChange={(e) =>
                              setCommentsByPost((prevComments) => ({
                                ...prevComments,
                                [p._id]: e.target.value,
                              }))
                            }
                          ></textarea>
                          <button type="button" onClick={() => handleComment(p._id)}>
                            <SendOutlined />
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No post found</p>
            )}
          </div>
        </div>
        <div className="todo-list">
          <ListToDo />
        </div>
      </div>
    </div >
  );
}
