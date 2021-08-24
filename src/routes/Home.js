import Xweet from "components/Xweet";
import { dbService } from "Myfirebase";
import React, { useEffect, useState } from "react";
import XweetFactory from "components/XweetFactory";

const Home = ({ userObj }) => {
  const [xweets, setXweets] = useState([]);
  useEffect(() => {
    // 스냅챗을 리스너로 이용, 스냅챗은 데이터베이스의 변화가 생길때마다 알려줌
    dbService.collection("xweets").onSnapshot((snapshot) => {
      //스냅챗이 올때마다 배열 생성
      const xweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      //배열을 스테이트에 집어 넣기
      setXweets(xweetArray);
    });
  }, []);
  // map이 두개의 프롭을 갖는 컴포넌트 Xweet생성 ( xweetObj, isOwner )
  return (
    <div className="container">
      <XweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {xweets.map((xweet) => (
          <Xweet
            key={xweet.id}
            xweetObj={xweet}
            isOwner={xweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
