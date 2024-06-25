import checkTokenFirst from "@/middleware/auth"
import '../assets/index/style.less'
import ListToDo from "./todo/list";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { apiComment } from "@/api/comment";

import { apiPost } from "@/api/post";
import { CloudOutlined, MessageOutlined, SendOutlined } from "@ant-design/icons";
import { format } from "date-fns";
import { Footer } from "./footer";

export default function HomePage() {
  checkTokenFirst();

  const commentAPI = apiComment();
  const createComment = commentAPI.create

  const postAPI = apiPost();
  const create = postAPI.create
  const list = postAPI.getAll
  const like = postAPI.likePost

  const [content, setContent] = useState('')
  const [tag, setTag] = useState('')
  const [listPost, setListPost] = useState([])
  const [commentsByPost, setCommentsByPost] = useState({});
  const [refreshAllPost, setRefreshAllPost] = useState(false)

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

  const formatDate = (date: string) => {
    return format(date, 'yyyy-MM-dd')
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
      setRefreshAllPost(true)
      setContent('')
      setTag('')
      getAllPost()
    }

  }

  async function getAllPost() {
    const data = await list()
    console.log(data)
    setListPost(data)
  }

  async function commentToPost(comment: object) {
    const data = await createComment(comment)
    if (typeof data === 'object' && !data.error && data !== null) {
      toast.success('Comment successfully')
      getAllPost()
    } else {
      toast.error('Comment failed')
    }
  }

  const handleLike = async (postId: string) => {
    const likeDTO = {
      postId: postId,
      isLiked: true
    }

    const data = await like(likeDTO)
    console.log(likeDTO)
    if (typeof data === 'object' && !data.error && data !== null) {
      toast.success('Liked post successfully')
      getAllPost()
    } else {
      toast.error('Like failed')
    }

  }



  const handleComment = (postId: string) => {
    if (commentsByPost[postId]?.trim() !== '') {
      // Gửi dữ liệu bình luận lên server hoặc thực hiện các tác vụ khác
      //console.log(`Bình luận cho bài viết có id ${postId}: ${commentsByPost[postId]}`);
      setCommentsByPost((prevComments) => ({
        ...prevComments,
        [postId]: '',
      })); // Đặt lại nội dung bình luận về rỗng

      const commentContent = `${commentsByPost[postId]}`
      const comment = {
        content: commentContent,
        postId: postId,
      };

      commentToPost(comment)
      // console.log('Comment:', comment);
    }
  };

  return (

    <div className="row">

      <ToastContainer autoClose={3000} />
      <div className="content">
        <div className="post">
          <div className="form-create-post">
            <form action="">
              <h2>Add a new post</h2>
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
            <h2 className="title">All Posts</h2>

            {listPost.length > 0 ? (
              listPost.map((p) => (
                <div key={p._id} className="list-post">
                  <div className="post-item">
                    <div className="post-info">
                      <div className="author-date">
                        <div className="author">{p.name}</div>
                        <div className="post-date">
                          <small>{formatDate(p.createdAt)}</small>
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

                        <a onClick={() => { handleLike(p._id) }}>
                          <div className="icon"><CloudOutlined /></div>
                          <p>{p.totalLike}</p>
                        </a>
                        <a>
                          <div className="icon"><MessageOutlined /></div>
                          <p>{p.comment.length}</p>
                        </a>
                      </div>
                      <hr />
                      {p.comment.length > 0 ? (
                        <div className="post-list-comment">


                          {p.comment.map((comment, index) => (

                            <div key={index} className="comment-item" >

                              <div className="user-content">
                                <p className="user">{comment.userName}: &nbsp;</p>
                                <p>{comment.content}</p>
                              </div>
                              <p>
                                <small>{formatDate(comment.createdAt)}</small>
                              </p>
                            </div>
                          ))}

                        </div>
                      ) : (
                        <div className="post-list-comment no-cmt"></div>
                      )}
                      <div className="post-comment">
                        <form action="">
                          <textarea
                            placeholder="Enter your comment..."
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
