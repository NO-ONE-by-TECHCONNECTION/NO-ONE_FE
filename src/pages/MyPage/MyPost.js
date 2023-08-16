// 내가 작성한 게시글
// import { useRecoilValue } from "recoil";
// import { postsState } from "../../Data/User";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/MyPage/MyPost.scss";

const MyPost = () => {
  // const posts = useRecoilValue(postsState);
  const [educationList, setEducationList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          // 사용자가 작성한 게시글 불러오는 걸로 api 경로 수정
          "http://13.209.49.229:8080/api/v1/content"
        );
        setEducationList(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const goContentEdit = (contentId) => {
    navigate(`post-edit/${contentId}`);
  };

  return (
    <div className="mypost-container">
      <div className="mypost-top">
        <h1>작성한 게시글</h1>
        <Link to="/create-content">
          <button>게시글 작성하기</button>
        </Link>
      </div>
      <div className="post-items">
        {educationList.map((post) => (
          <div
            key={post.contentId}
            className="post-item"
            onClick={() => goContentEdit(post.contentId)}
          >
            <img className="logo" src={post.companyImg} alt="logo" />
            <div>
              <p>[ {post.companyName} ]</p>
              <p>{post.title}</p>
              <span className="link">
                수정 및 삭제
                <img src="/icon/arrow-right.svg" alt="arrow" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPost;
