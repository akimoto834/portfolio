import React  from "react";
import { useEffect, useState, useContext } from 'react';
import { Button } from "../components/Button";
import { CreateForm } from "../components/CreateForm";
import { MyTimeline } from "../components/MyTimeline";
import GlobalStyles from '@mui/material/GlobalStyles';
import { ReplyInput } from "../components/ReplyInput";
import { SelectEpi } from "../components/SelectEpi";
import { UpBar } from "../components/UpBar";
import { SelectChangeEvent } from "@mui/material";
import EpiAlert from "../components/EpiAlert";
import { Search } from "../components/Search";
import { ToolBar } from "../components/ToolBar";
import { TitleSec } from "../components/TitleSec";
import { TitleView } from "../components/TitleView";
import { Profile } from "../components/Profile";
import { ProfileEdit } from "../components/ProfileEdit";
import { ImagePractice } from "../components/ImagePractice";
import { MyAvatar } from "../components/MyAvatar";
import { UserContext } from "../auth/UserContext";
import { Button2 } from "../components/Button2";
import { parse } from 'csv-parse';
import fs from 'fs';


const Home: React.FC = () => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    {/*コンポーネント内の状態や props が変更され、再レンダリングが発生するため、useEffect フックの第二引数が空であっても、新しい関数が生成され、以前の handleResize 関数と異なる参照として認識されます。
       したがって、ウィンドウのリサイズイベントが発生するたびに、新しい関数がイベントリスナーとして追加され、以前のイベントリスナーが削除されることがあります。*/}
       useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth); // ウィンドウサイズが変更されたときにカードの幅を更新しますイベントをwindowにセット
        };

        window.addEventListener('resize', handleResize); // ウィンドウサイズ変更時のリスナーを追加します

        // return 文は、クリーンアップ関数を指定するために使用
        //コンポーネントが DOM から削除される（アンマウントされる）直前 or 副作用が再実行される直前に実行
        return () => {
            window.removeEventListener('resize', handleResize); // コンポーネントがアンマウントされるときにリスナーを削除します
        };
    }, []); 

    const [posts, setPosts] = useState<Post[]>([]);//postを管理する
    const [goods, setGoods] = useState<Good[]>([]);//goodを管理する
    const [inputText, setInputText] = useState<string>("")
    const [inputReplyText, setReplyInputText] = useState("")
    const [replyPost, setReplyPost] = useState<Post>({id:0, user_id: 0,  body: "", title:"", epi: 0, userNewEpi: 0, father_id:0,  
                                                    time: "0",reply: false})//返信先のポスト
    
    const userContext = useContext(UserContext);
    if (!userContext) {
        throw new Error("Home must be used within a UserProvider");
    }
    const { users, loginUser } = userContext;
    const [userList, setUserList] = useState(users);
    const [user,setUser] = useState(loginUser)//ログインしているユーザーの情報を格納

    //ユーザーidからユーザーの名前を取得
    const handleGetUserName = (user_id: number):string => {
        var user = userList.filter((u)=>u.id===user_id)
        if(user.length === 0){
            return ""
        }else{
            return user[0].name
        }
    }  


    const [userNewEpi, setUserNewEpi] = useState<number>(300);//ある単行本でユーザーが何話までの考察を見たか
    const [firstEpiInput, setFirstEpiInput] = useState<number>(userNewEpi)//何話からの考察かを指定 保留中の値
    const [lastEpiInput, setLastEpiInput] = useState<number>(userNewEpi)//何話までの考察かを指定　保留中の値

    //プロフィール情報
    const[profiles, setProfiles] = useState<MyProfile[]>([
        {id: 0, icon: "userIcon", body:"呪術廻戦", score: 0, evaluate: "A"},
        {id: 1, icon: "data:image/png;base64,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", body:"ジャンプオタクの大学生、ヒロアカ、ワンピース、キングダムなど最近はもっぱら呪術廻戦", score: 0, evaluate: "A"},
        {id: 2, icon: "userIcon", body:"ONEPIECE!!!", score: 0, evaluate: "A"},
        {id: 3, icon: "userIcon", body:"ONE!!!", score: 0, evaluate: "A"},
        {id: 4, icon: "userIcon", body:"ONE!!!", score: 0, evaluate: "A"},
        {id: 5, icon: "userIcon", body:"ONE!!!", score: 0, evaluate: "A"},

    ])

    //プロフィールの編集入力
    const[selfIntroInput, setSelfIntroInput] = useState<string>(profiles[user.id].body)
    const[userNameInput, setUserNameInput] = useState<string>(user.name)


    //読んだタイトルと何話まで読んだかのリスト
    const[userRead, setUserRead] = useState<UserRead[]>([//あとでuserNewEpiをこれに置き換える
        {user_id: 1, title_id: 0,  epi: 300},
        {user_id: 1, title_id: 1,  epi: 400},
        {user_id: 1, title_id: 2,  epi: 300},
    ])

    const [firstEpi, setFirstEpi] = useState<number>(userNewEpi)//何話からの考察かを指定 タイムラインに表示する値
    const [lastEpi, setLastEpi] = useState<number>(userNewEpi)//何話までの考察かを指定


    const [writereply, setWriteReply] = useState<boolean>(false)//返信を書く画面がが開かれてるかどうか

    const [selectEpiOpen, setSelectEpiOpen] = useState(false);
    const [sort, setFilter] = useState<Sort>("new");//現在のfilterが何であるかを保持

    const [homeis, setHomeis] = useState(true);

    const handleGetNewEpi = () => {
        const gotUserRead = userRead.filter((val)=>val.title_id===selectedTitle.title_id)
        if(gotUserRead.length===0){//読んだことない本なら
            setUserRead((userRead)=>{//userReadに追加
                const newUserRead = {user_id: user.id, title_id: selectedTitle.title_id, epi: 1}
                return [...userRead, newUserRead]
            })
            return 1
        }else{
            return gotUserRead[0].epi
        }
    }

    const handleHomeis = () => {
        setHomeis(!homeis)
        let epi = handleGetNewEpi();
        setUserNewEpi(epi)
        setFirstEpi(1)
        setFirstEpiInput(1)
        setLastEpi(epi)
        setLastEpiInput(epi)
        getPost(selectedTitle.title_id)
    }

    const [upBarHeight, setUpBarHeight] = useState(0); //Mytimelineに渡すためにUpBarの高さを取得

    const[title, setTitle] = useState<Title[]>([{genre: "comic", title_id: -1, title_name: "", new_epi:0, book_new_firstEpi: 0, book_new_lastEpi: 0}])

    const addTitle = (genre: string, title_name: string) => {
        setTitle(prevTitles => {
            const newTitleId = prevTitles.length;
            const newTitle = {
                genre: genre,
                title_id: newTitleId,
                title_name: title_name,
                new_epi: 1,
                book_new_firstEpi: 1,
                book_new_lastEpi: 1
            };
            return [...prevTitles, newTitle];
        });
    };

    const [selectedTitle, setSelectedTitle] = useState<Title>(title[0]);

    const handleSetTitle = (newTitle: number) => {
        if(title.some((val) => val.title_id === newTitle)){
            setSelectedTitle(title.find((val) => val.title_id === newTitle));
        }
    };

    //タイトルidからタイトルの名前を取得
    const handleGetTitleName = (title_id: number, epi:number):string[] => {
        var titleName = title.filter((t)=>t.title_id===title_id)
        var chapterName = chapter.filter((chap)=>chap.first_epi<=epi && epi <= chap.last_epi)
        if(titleName.length === 0 || chapterName.length===0){
            return ["", ""]
        }else{
            return [titleName[0].title_name, chapterName[0].chap_name]
        }
    }  

    const[epiAlertOpen, setEpiAlertOpen] = useState(false)

    const [buttonState, setButtonState] = useState(false);

    const handleButtonClick = () => {
        setButtonState(!buttonState);
    };

    const [genre, setGenre] = useState<string>("comic");

    const handleButtonClick2 = (newGenre: string) => {
        setGenre(newGenre);
    };

    //chapter選択何押されてるか
    const[chapButton, setChapButton] = useState<string>("")
    
    const [chapter, setChapter] = useState<Chapter[]>([])

    //何巻が選択されているか
    const [bookNum, setBookNum] = useState<string>("1")


    const [books, setBooks] = useState<Book[]>([])

    const [searchedPost, setSearchedPost] = useState<Post[]>([])//検索されたポスト
    const [searchedInput, setSearchedInput] = useState<Post[]>([])//検索に合ったポストを一時的に保存しておく
    const [searchOpen, setSearchOpen] = useState(false)//検索結果のタイムラインの表示
    const [searchText, setSearchText] = useState<string>("")

     //プロフィール画面開いているかどうか
     const [profileOpen, setProfileOpen] = useState(false)
     //プロフィール編集画面開いてるか
     const [profileEditOpen, setProfileEditOpen] = useState(false)

      //開いてるプロフィール画面のuser_id
      const [ProfileID, setProfileID] = useState<number>(1)
 
     
     //自身のプロフィール画像
     const [AvatarImage, setAvatarImage] = useState<string>("");//base64形式
 
     //選択した画像をbase64形式でstateに追加する
     const handleInputFile = (e: React.ChangeEvent<HTMLInputElement>) => {
         const file = e.target.files?.[0];// 複数ファイルがアップロードされれば最初のファイルを取得
 
         var result2 = "q"
         if (file) {
             //ファイルを読み込むためにFileReaderを利用する
             const reader = new FileReader();
 
             //画像ファイルをbase64形式で読み込む　完了時にonloadendイベントを呼ぶ
             reader.readAsDataURL(file)
 
             // ファイルの読み込みが完了したら呼び出され、画像のstateに加える
             reader.onloadend = () => {
                 const result = reader.result;// 読み込んだデータは reader.result で取得できる
                 if(typeof result !== "string"){
                     return;
                 }
                 result2=result
                 setAvatarImage(result)
             }
         }
         setProfiles((profiles) => {
            const newProfile = profiles.map((profile) => {
                if(profile.id === user.id){
                  return { ...profile, body: selfIntroInput, icon: result2}//...postでpostを展開する　展開先にreplyがあれば引数で置き換える シャローコピー
                }else{
                  return profile
                }
            });
    
            return newProfile
        })   
 
     }
    
    const handleChangeUser = () => {
        setUser(prevUser => ({
            ...prevUser,
            id: prevUser.id === 1 ? 2 : 1,
            mail: prevUser.id === 1 ? "b@gmail.com" : "a@gmail.com",
            name: prevUser.id === 1 ? "aki" : "take",
            evaluate: prevUser.id === 1 ? "B" : "A"
        }));
        setUserNewEpi(user.id === 1 ? 1100 :300)
    }


    //新規投稿を書く処理
    const handleWriteText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputText(e.target.value)
    }

    //返信を書く処理
    const handleWriteReplyText = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setReplyInputText(e.target.value)
    }

    //自己紹介の編集
    const handleSelfIntro = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSelfIntroInput(e.target.value)
    }

    //自己紹介の編集
    const handleUserName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUserNameInput(e.target.value)
    }


     //タイムラインの開始話指定
     const handleChangeFirstEpi = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setChapButton("")
        if( Number(e.target.value)>=0 && Number(e.target.value)<=selectedTitle.new_epi){
            let newValue = e.target.value
            setFirstEpiInput(Number(newValue))
            Number(newValue)>lastEpiInput && setLastEpiInput(Number(newValue))
        }    
        
    }

    const gettitle = () => {
        fetch('/titles.json')
        .then(response => response.json())
        .then(data => {
          const formattedTitles = data.map((item: any) => ({
            genre: item.genre,
            title_id: item.title_id,
            title_name: item.title_name,
            new_epi: item.new_epi,
            book_new_firstEpi: item.book_new_firstEpi,
            book_new_lastEpi: item.book_new_lastEpi
          }));
          setTitle(formattedTitles);
        })
        .catch(error => console.error('Error fetching the titles:', error));
        
      }

      const getchapter = () => {
        fetch('/chapters.json')
        .then(response => response.json())
        .then(data => {
          const formattedChapters = data.map((item: any) => ({
            title_id: item.title_id,
            chap_num: item.chap_num,
            chap_name: item.chap_name,
            first_epi: item.first_epi,
            last_epi: item.last_epi
          }));
          setChapter(formattedChapters);
        })
        .catch(error => console.error('Error fetching the titles:', error));
        
      }

      const getbook = () => {
        fetch('/books.json')
        .then(response => response.json())
        .then(data => {
          const formattedBooks = data.map((item: any) => ({
            title_id: item.title_id,
            book_num: item.book_num,
            first_epi: item.first_epi,
            last_epi: item.last_epi
          }));
          setBooks(formattedBooks);
        })
        .catch(error => console.error('Error fetching the titles:', error));
        
      }

     //タイムラインの終わり話指定
     const handleChangeLastEpi = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setChapButton("")
        if( Number(e.target.value)>=0 && Number(e.target.value)<=selectedTitle.new_epi){
            let newValue = e.target.value;           
            setLastEpiInput(Number(newValue));
            (Number(newValue)>0 && firstEpiInput==0) && setFirstEpiInput(1);//1話より大きい数が入力されると開始の値も1にする
            Number(newValue)<firstEpiInput && setFirstEpiInput(Number(newValue));//開始話の方が大きいなら開始話を終了話に合わせる
        }else if(Number(e.target.value)>selectedTitle.new_epi){//最新話以上の入力は最新話に
            setLastEpiInput(selectedTitle.new_epi);
        }
     }

    
     //タイムラインに指定した範囲を反映させる
     const handleChangeRangeEpi = () => {
        if(lastEpiInput>userNewEpi){//自身の話数より先の考察見るなら
            handleToggleEpiAlert()//警告を表示
        }else{
            if(selectEpiOpen){
                setFirstEpi(firstEpiInput)
                setLastEpi(lastEpiInput)
                handleToggleSelectEpi()
            }
            if(searchText===""){
                setSearchOpen(false)
            }else{//検索欄に何か書き込まれた状態で決定押されたら検索結果のタイムラインを示す
                setSearchOpen(true)
            }
            setSearchedPost(searchedInput)//検索に応じたポストにする
            
        }
        
     }

     //同意したら自身の最新話が更新される
     const handleUpdateUserNewEpi = () => {
        handleToggleEpiAlert()//閉じる
        setFirstEpi(firstEpiInput)
        setLastEpi(lastEpiInput)
        setUserNewEpi(lastEpiInput)
        setUserRead((userRead)=>{//最新話の更新
            const newUserRead = userRead.map((val)=>{
                if(val.title_id===selectedTitle.title_id){
                    return {...val, epi:lastEpiInput}
                }else{
                    return val
                }
            })
            return newUserRead
        })
        handleToggleSelectEpi()

        if(searchText===""){
            setSearchOpen(false)
        }else{
            setSearchOpen(true)
        }
        setSearchedPost(searchedInput)//検索に応じたポストにする
     }

     //編や単行本最新話の反映
     const handleSelectChapter = (chapName: string) => {
        console.log(chapName)
        if(chapName === "NewEpi"){
            setChapButton("NewEpi")
            setFirstEpiInput(selectedTitle.new_epi)
            setLastEpiInput(selectedTitle.new_epi)
        }else if(chapName === "bookNewEpi"){
            setChapButton("bookNewEpi")
            setFirstEpiInput(selectedTitle.book_new_firstEpi)
            setLastEpiInput(selectedTitle.book_new_lastEpi)
        }else if(chapName === "all"){
            setChapButton("all")
            setFirstEpiInput(1)
            setLastEpiInput(selectedTitle.new_epi)
        }else{
            chapter.map((chap)=>{
                if(chapName === chap.chap_name){
                    setChapButton(chap.chap_name)
                    setFirstEpiInput(chap.first_epi)
                    setLastEpiInput(chap.last_epi)
                }
            })
        }


     }
    

    
    //新規投稿をする処理
    const handlePost = () => {
        if (!inputText) {// 何も入力されていなかったら
            return;
        }
        const body = inputText;
        const epi = lastEpi;//何話に関する投稿か
        const thenUserEpi = userNewEpi;//投稿時点での投稿者は何話まで読んでるか
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // 月は0から始まるため +1 します
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        const newPost = {id: new Date().getTime(), user_id: user.id,  body: body, title:selectedTitle.title_name, epi: epi, userNewEpi: thenUserEpi, father_id: new Date().getTime(), 
                         time: 's',  reply: true};
        handlePostSort([...posts, newPost])
        setInputText("");
    }
   
    //返信する処理
    const handleReplyPost = () => {
        if (!inputReplyText) {// 何も入力されていなかったら
            setWriteReply(false)
            return;
        }
        const body = inputReplyText;
        const thenUserEpi = userNewEpi;//投稿時点での投稿者は何話まで読んでるか 
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // 月は0から始まるため +1 します
        const day = currentDate.getDate();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const seconds = currentDate.getSeconds();
        //返信は親の話数に対する返信と仮定する
        const newPost = {id: new Date().getTime(), user_id: user.id,  body: body, title:"onepiece", epi: replyPost.epi, userNewEpi: thenUserEpi, father_id: replyPost.id, 
                         time: `s`, reply: true};//返信欄は開いたまま
        handlePostSort([...posts, newPost])
        setReplyInputText("");
        setWriteReply(false)
    }

    //いいねボタン押すたびにgoodデータベースにログインしてるユーザのデータを追加・削除
    const handleGood = (post :Post)=>{
        {/*同じオブジェクトを参照している場合にのみ真。プロパティの値が同じであっても、別のオブジェクトなら、includes()メソッドではtrueになりません。 */}
        if(goods.some(good => good.post_id === post.id && good.user_id === user.id)){//プロパティで比較 既にログインしているユーザーがgoodしてるなら
            //goodsからuser_idのを消す処理 
            setGoods((goods) => goods.filter((good) => !(good.post_id === post.id && good.user_id === user.id)))
        }else{
            //goodにuser_Id付け加える
            setGoods((goods) => [{post_id: post.id, user_id: user.id}, ...goods])
        }
    }

    //あるpostをログインしているユーザがgoodしたかどうか
    const handleSerchUserGood = (post: Post) => {
       if(goods.some(good => good.post_id === post.id && good.user_id === user.id)){
            return true
       }else{
            return false
       }
    }

    //あるポストのgood数を数える
    const handleCountGood = (post: Post) : number=> {
        return goods.filter((good) => good.post_id === post.id ).length
    }

    //各コメントで返信の確認押されたときの処理
    const handleOpenReply = (selectPost: Post) => {
        setPosts((posts) => {
            const newPosts = posts.map((post) => {
                if(post.id === selectPost.id){
                  return { ...post, reply: !post.reply }//...postでpostを展開する　展開先にreplyがあれば引数で置き換える シャローコピー
                }else{
                  return post
                }
            });
    
            return newPosts
        })    
    }

    //あるポストの返信ポストを探してリストとして返す
    const handlegetChildComment = (selectPost: Post): Post[] => {
        const newPosts = posts.filter((post)=>post.father_id===selectPost.id && !(post.id === selectPost.id))
        return newPosts
    }

    //あるポストの返信の返信も含めた全ての返信をリストとして返す
    const handlegetChildrenComment = (selectPost: Post): Post[] => {
        const childPosts = posts.filter((post)=>post.father_id===selectPost.id && !(post.id === selectPost.id))//引数の子のポスト取得
        if(childPosts.length===0){
            return childPosts
        }else{
            const childrenPosts = childPosts.flatMap((post) => {//サイズ1に対して1より大きいサイズのリストが返ってきてネストされたリスト作られるためフラット化する
               return handlegetChildrenComment(post)
            });
            return [...childPosts, ...childrenPosts]
        }
        
    }

    //返信欄の表示の有無
    const handleReply = (post: Post) => {
         setWriteReply(true)
         setReplyPost(post)
    }

    //epiのdrawerの開閉
    const handleToggleSelectEpi = () => {
        setSelectEpiOpen((drawerOpen) => !drawerOpen);
    };

    const handleToggleEpiAlert = () => {
        setEpiAlertOpen((epiAlertOpen) => !epiAlertOpen)
    }

    const handleToggleProfile = (user_id: number) => {
        setProfileOpen((profileOpen) => !profileOpen)
        setProfileID(user_id)
    }

    

    const handleToggleProfileEdit = () => {
        if(profileEditOpen){//プロフィール編集画面で押されたときプロフィールを更新する
            setProfiles((profiles) => {
                const newProfile = profiles.map((profile) => {
                    if(profile.id === user.id){
                      return { ...profile, body: selfIntroInput, icon: AvatarImage}//...postでpostを展開する　展開先にreplyがあれば引数で置き換える シャローコピー
                    }else{
                      return profile
                    }
                });
        
                return newProfile
            })    
            setUserList((users) => {
                const newUser = users.map((u) => {
                    if(u.id === user.id){
                      return { ...user, name: userNameInput}//...postでpostを展開する　展開先にreplyがあれば引数で置き換える シャローコピー
                    }else{
                      return u
                    }
                });
        
                return newUser
            })    
            setUser({ ... user, name: userNameInput})

        }
        setProfileEditOpen((profileEditOpen) => !profileEditOpen)
        console.log(user.name)
    }

    //タイムラインの並び替え
    const handleSort = (e: SelectChangeEvent) => {//変更したら投稿の所も変える
        setFilter(e.target.value as Sort);

        const sortedPosts = [...posts];  // postsをコピーして新しい配列を作成
        sortedPosts.sort((a, b) => {
            let result = 0;

            switch (e.target.value as Sort) {//引数をソートにすると反映される前に実行されてまう？
                //sortは引数(a,b)に対し負の値を返す->aはbの前に配置（昇順）。正の値を返す->aはbの後に配置（降順）。0を返す->aとbの順序はそのまま。
                case "old":
                    result = a.id - b.id; // idの昇順でソート 負の値を返す＝bの方が大きい　順番はa,bより昇順（小から大）
                    break
                case "new":
                    result = b.id - a.id; // idの降順でソート
                    break;
                case "old_story":
                    result = a.epi - b.epi; // epiの昇順でソート
                    if (result === 0) {
                        result = a.id - b.id; // 同じepiの場合、idの昇順でソート
                    }
                    break;
                case "new_story":
                    result = b.epi - a.epi; // epiの降順でソート
                    if (result === 0) {
                        result = b.id - a.id; // 同じepiの場合、idの降順でソート
                    }
                    break;
                // case "good":
                //     break;
                // case "recommend":
                //     break;
                default:
                    return 0; // デフォルトは変更を加えない
            }

            return result;
        });
      
        setPosts(sortedPosts);  // ソート後の配列でpostsを更新
    };

    //投稿時に現在のsortに応じて適切な位置に投稿する
    const handlePostSort = (newPosts: Post[]) => {//変更したら投稿の所も変える
        const sortedPosts = [...newPosts];  // postsをコピーして新しい配列を作成
        console.log(sort)
        sortedPosts.sort((a, b) => {
            let result = 0;

            switch (sort) {//引数をソートにすると反映される前に実行されてまう？
                //sortは引数(a,b)に対し負の値を返す->aはbの前に配置（昇順）。正の値を返す->aはbの後に配置（降順）。0を返す->aとbの順序はそのまま。
                case "old":
                    result = a.id - b.id; // idの昇順でソート 負の値を返す＝bの方が大きい　順番はa,bより昇順（小から大）
                    break
                case "new":
                    result = b.id - a.id; // idの降順でソート
                    break;
                case "old_story":
                    result = a.epi - b.epi; // epiの昇順でソート
                    if (result === 0) {
                        result = a.id - b.id; // 同じepiの場合、idの昇順でソート
                    }
                    break;
                case "new_story":
                    result = b.epi - a.epi; // epiの降順でソート
                    if (result === 0) {
                        result = b.id - a.id; // 同じepiの場合、idの降順でソート
                    }
                    break;
                // case "good":
                //     break;
                // case "recommend":
                //     break;
                default:
                    return 0; // デフォルトは変更を加えない
            }

            return result;
        });
        console.log(sortedPosts)
        setPosts(sortedPosts);  // ソート後の配列でpostsを更新
    };


    //巻数を選択
    const handleBookNumChange = (e?: SelectChangeEvent ) => {
        if(e != undefined){//変更された時の処理
            setBookNum(e.target.value)
            setChapButton("book")
            setFirstEpiInput(books[Number(e.target.value)-1].first_epi)
            setLastEpiInput(books[Number(e.target.value)-1].last_epi)
        }else{//開いた場合に現在の選択肢をセレクトしておく　変更されなくてもセレクトできるようになる
            setChapButton("book")
            setFirstEpiInput(books[Number(bookNum)-1].first_epi)
            setLastEpiInput(books[Number(bookNum)-1].last_epi)
        }
        
    }

    // 、大文字を小文字に変換し、さらに半角英数字を全角にする関数
    const normalization = (str: string) => {
        return str.toLowerCase().replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
          });
    }

    //返信の検索はヒットしない　親の検索のみ　親の返信は通常通りすべて表示される
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)  => {
        if(e.target.value === ""){
            setSearchOpen(false)
        }
        setSearchText(e.target.value)

        // 検索文字列を空白で分割して配列に格納 空の要素をfilterで取り除く
        const searchArray = e.target.value.split(/[\s]+/).filter(word => word !== '');//正規表現
        const NormalizatonSearchArray = searchArray.map((t)=>{
            return normalization(t)
        })
        const matchPost = posts.filter((post)=>{//条件に合うpostのみmatchPostへ
            const normalizationBody=normalization(post.body)
            let l = searchArray.length
            let i = 0
            while(i<l){//もしpostにsearchArrayのいずれかが含まれていたら
                if(normalizationBody.includes(NormalizatonSearchArray[i])){
                    return true
                }
                i += 1
            }
            return false
        })
        setSearchedInput(matchPost)
    
    }


    useEffect(() => {
        gettitle();
        getchapter();
        getbook();
        // const interval = setInterval(() => {
        //   gettitle();
        //   getchapter();
        //   getbook();
        // }, 5000);
    
        // return () => clearInterval(interval);
    }, []);




    const getPing = () => {
        fetch("http://15.152.32.244:8080/ping", {
          
            

          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Id": "1",
          }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    }

    async function getPost(title_id: number) : Promise<void>{
        
        var posts:Post[] = []
        let promises = [];
        for(let epi_id = 1; epi_id< handleGetNewEpi()+1; epi_id++){
            let promise = fetch(`http://15.152.32.244:8080/comment?title=${title_id}&epi=${epi_id}`, {

                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Id": `${user.id}`,
                }
            })
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
            })
            .then(data => {
                let comments=data.data.data.comments
                console.log(comments)
                if(comments==undefined){

                }else{
                   
                    for(let j=0; j < comments.length; j++){
                       
                        const newPost: Post = {
                            id: comments[j].id, 
                            user_id: comments[j].user_id,  
                            body: comments[j].content, 
                            title:selectedTitle.title_name, 
                            epi: epi_id, 
                            userNewEpi: epi_id, //ここはこの投稿の投稿者が投稿時点で何話まで読んだかだがデータベース準備頼むの忘れた
                            father_id: comments[j].father_id==undefined? comments[j].id : comments[j].father_id, 
                            time: comments[j].time,
                            reply: false
                        };
                        posts.push(newPost)
                        //console.log(newPost)
                    }  
                }
                
                
            })
            .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            });

            promises.push(promise)
        }
        //すべてのフェッチ操作が完了するのをPromise.allを使って待ち、その後handlePostSort(posts)を呼び出します。これにより、非同期操作の完了を確実に待つ
        //for文自体は完了してPromise.allは呼ばれるが各promiseのfetchはまだ行われており、すべて完了すると先へ進める
        await Promise.all(promises);
        handlePostSort(posts)//この関数内でsetPostsしてくれる
        console.log(posts)
    }

   

    async function postPost (){
        if (!inputText) {// 何も入力されていなかったら
            return;
        }
        let promises = [];
        console.log(user.id);
        let promise =fetch("http://15.152.32.244:8080/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Id": `${user.id}`,//user_id
          },
          
          body: JSON.stringify({
            title_id: `${selectedTitle.title_id}`,
            epi_id: `${lastEpi}`,
            content: inputText,
            name: `${handleGetUserName(user.id)}`
          }) // ここにPOSTリクエストで送信するデータを含めます
        })
        .then(response => {
            console.log('Response Status:', response.status); // レスポンスステータスコードを出力
            console.log('Response Status Text:', response.statusText); // レスポンスステータスのテキストを出力
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then(data => {
            console.log('Response Data:', data); // サーバーからのレスポンスデータを出力
          })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
          });
          promises.push(promise)
          await Promise.all(promises);
          getPost(selectedTitle.title_id)
          setInputText("");
      }

      async function  postReplyPost(){
        if (!setReplyInputText) {// 何も入力されていなかったら
            return;
        }

        console.log(replyPost.id)
        let promises = [];

        let promise = fetch("http://15.152.32.244:8080/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Id": `${user.id}`,
          },
          body: JSON.stringify({
            title_id: `${selectedTitle.title_id}`,
            epi_id: `${lastEpi}`,
            father_id: `${replyPost.id}`,
            content: inputReplyText,
            name: `${handleGetUserName(user.id)}`
          }) // ここにPOSTリクエストで送信するデータを含めます
        })
        .then(response => {
            console.log('Response Status:', response.status); // レスポンスステータスコードを出力
            console.log('Response Status Text:', response.statusText); // レスポンスステータスのテキストを出力
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then(data => {
            console.log('Response Data:', data); // サーバーからのレスポンスデータを出力
          })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
          });
          promises.push(promise)
          await Promise.all(promises)
          getPost(selectedTitle.title_id)
          setReplyInputText("");
          setWriteReply(false)
      }

      async function getIcon(user_id: number) : Promise<void>{
        
        var posts:Post[] = []
        let promises = [];
        for(let epi_id = 1; epi_id< handleGetNewEpi()+1; epi_id++){
            let promise = fetch(`http://15.152.32.244:8080/icon`, {

                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Id": `${user_id}`,
                }
            })
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
            })
            .then(data => {
                console.log(data)
                return data
            })
            .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            });

            promises.push(promise)
        }
        //すべてのフェッチ操作が完了するのをPromise.allを使って待ち、その後handlePostSort(posts)を呼び出します。これにより、非同期操作の完了を確実に待つ
        //for文自体は完了してPromise.allは呼ばれるが各promiseのfetchはまだ行われており、すべて完了すると先へ進める
        await Promise.all(promises);
    }

      async function  postIcon(){
        if (!setReplyInputText) {// 何も入力されていなかったら
            return;
        }

        console.log(replyPost.id)
        let promises = [];
        console.log(AvatarImage)
        let promise = fetch("http://15.152.32.244:8080/icon", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Id": `${user.id}`,
          },
          body: JSON.stringify({
           
            data : `${AvatarImage}`
          }) // ここにPOSTリクエストで送信するデータを含めます
        })
        .then(response => {
            console.log('Response Status:', response.status); // レスポンスステータスコードを出力
            console.log('Response Status Text:', response.statusText); // レスポンスステータスのテキストを出力
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then(data => {
            console.log('Response Data:', data); // サーバーからのレスポンスデータを出力
          })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
          });
          promises.push(promise)
          await Promise.all(promises)
      }

      async function getGood() : Promise<void>{
        
        var posts:Post[] = []
        let promises = [];
    
        let promise = fetch(`http://15.152.32.244:8080/good?post=64`, {

            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Id": "2",
            }
        })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
        })
        .then(data => {
            console.log(data)
                        
            
        })
        .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        });

        promises.push(promise)
        
        //すべてのフェッチ操作が完了するのをPromise.allを使って待ち、その後handlePostSort(posts)を呼び出します。これにより、非同期操作の完了を確実に待つ
        //for文自体は完了してPromise.allは呼ばれるが各promiseのfetchはまだ行われており、すべて完了すると先へ進める
        await Promise.all(promises);
        handlePostSort(posts)//この関数内でsetPostsしてくれる
        console.log(posts)
    }

      return(
        <>
            <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }} />


            {homeis ?
                <>
                {profileOpen ?
                        <>
                            {profileEditOpen?
                                <ProfileEdit user={user} profiles={profiles} userRead={userRead} selfIntroInput={selfIntroInput} userNameInput={userNameInput} AvatarImage={AvatarImage}
                                            onToggleProfileEdit={handleToggleProfileEdit} onGetTitleName={handleGetTitleName} onSelfIntro={handleSelfIntro} onUserName={handleUserName} onInputFile={handleInputFile}/> 
                                :
                                <Profile user={user} profiles={profiles} userRead={userRead} AvatarImage={AvatarImage} ProfileID={ProfileID} onToggleProfileEdit={handleToggleProfileEdit} onToggleProfile={handleToggleProfile} onGetTitleName={handleGetTitleName} onGetUserName={handleGetUserName}/>
                            }
                        </>
                        :   
                        <>
                            {/*<Button2
                                buttonState = {buttonState}
                                //isClick = {getIcon}
                                isClick={postIcon}
                            />/*/}

                            <Button
                                buttonState = {buttonState}
                                isClick = {handleButtonClick}
                            />
                          
                            <CreateForm
                                buttonState = {buttonState}
                                isClick = {handleButtonClick}
                                addTitle = {addTitle}
                            />
                            <ToolBar
                                user={user}
                                buttonState = {genre}
                                AvatarImage={AvatarImage}
                                onToggleProfile={handleToggleProfile}
                                isClick = {handleButtonClick2}
                                profiles={profiles}
                            />
                            <TitleView
                                selectedtitle={selectedTitle}
                                chapter = {chapter}
                                books = {books}
                                isClick = {handleHomeis}
                            />
                            <TitleSec
                                genre = {genre}
                                titlelist = {title}
                                settitle = {handleSetTitle}
                                selectedtitle={selectedTitle}
                            />
                        </>
                }
                </>
                :
                <>
                {writereply ?
                    <ReplyInput 
                        inputReplyText={inputReplyText}
                        windowWidth={windowWidth}
                        replyPost={replyPost}
                        onWriteReplyText={handleWriteReplyText}
                        onPostReplyPost={postReplyPost}
                    />
                    :
                    <>
                    {profileOpen ?
                        <>
                            {profileEditOpen?
                                <ProfileEdit user={user} profiles={profiles} userRead={userRead} selfIntroInput={selfIntroInput} userNameInput={userNameInput} AvatarImage={AvatarImage}
                                            onToggleProfileEdit={handleToggleProfileEdit} onGetTitleName={handleGetTitleName} onSelfIntro={handleSelfIntro} onUserName={handleUserName} onInputFile={handleInputFile}/> 
                                :
                                <Profile user={user} profiles={profiles} userRead={userRead} AvatarImage={AvatarImage} ProfileID={ProfileID} onToggleProfileEdit={handleToggleProfileEdit} onToggleProfile={handleToggleProfile} onGetTitleName={handleGetTitleName} onGetUserName={handleGetUserName}/>
                            }
                        </>
                        :
                        <>
                            {searchOpen ?
                                <MyTimeline
                                    user={user}
                                    posts={searchedPost} 
                                    inputText= {inputText}
                                    windowWidth={windowWidth}
                                    userNewEpi={userNewEpi}
                                    firstEpi={firstEpi}
                                    lastEpi={lastEpi}
                                    AvatarImage={AvatarImage}
                                    profiles={profiles}
                                    onPost={handlePost}
                                    onWriteText={handleWriteText}
                                    onGood={handleGood}
                                    onSerchUserGood={handleSerchUserGood}
                                    onOpenReply={handleOpenReply}
                                    onGetChildComment={handlegetChildComment}
                                    onGetChildrenComment={handlegetChildrenComment}
                                    onReply={handleReply}
                                    onChangeUser={handleChangeUser}
                                    onCountGood={handleCountGood}
                                    selectedtitle={selectedTitle}
                                    onGetUserName={handleGetUserName}
                                    onToggleProfile={handleToggleProfile}
                                    onPostPost={postPost}
                                    onGetPost={getPost}
                                />
                                :
                                <MyTimeline
                                        user={user}
                                        posts={posts} 
                                        inputText= {inputText}
                                        windowWidth={windowWidth}
                                        userNewEpi={userNewEpi}
                                        firstEpi={firstEpi}
                                        lastEpi={lastEpi}
                                        AvatarImage={AvatarImage}
                                        profiles={profiles}
                                        onPost={handlePost}
                                        onWriteText={handleWriteText}
                                        onGood={handleGood}
                                        onSerchUserGood={handleSerchUserGood}
                                        onOpenReply={handleOpenReply}
                                        onGetChildComment={handlegetChildComment}
                                        onGetChildrenComment={handlegetChildrenComment}
                                        onReply={handleReply}
                                        onChangeUser={handleChangeUser}
                                        onCountGood={handleCountGood}
                                        selectedtitle={selectedTitle}
                                        onGetUserName={handleGetUserName}
                                        onToggleProfile={handleToggleProfile}
                                        onPostPost={postPost}
                                        onGetPost={getPost}
                                />
                            }
                            <SelectEpi 
                                selectEpiOpen={selectEpiOpen} title={selectedTitle} chapter={chapter} windowWidth={windowWidth} userNewEpi={userNewEpi} 
                                firstEpiInput={firstEpiInput} lastEpiInput={lastEpiInput} chapButton={chapButton} books={books} bookNum={bookNum}
                                searchText={searchText}
                                onToggleSelectEpi={handleToggleSelectEpi} onChangeFirstEpi={handleChangeFirstEpi} onChangelastEpi={handleChangeLastEpi} 
                                onSelectChapter={handleSelectChapter} onChangeRangeEpi={handleChangeRangeEpi} onBookNumChange={handleBookNumChange} onSearch={handleSearch}
                            />

                            <UpBar profiles={profiles} user={user} sort={sort} title={selectedTitle} firstEpi={firstEpi} lastpi={lastEpi} searchOpen={searchOpen} searchText={searchText}  AvatarImage={AvatarImage} onToggleSelectEpi={handleToggleSelectEpi} onToggleProfile={handleToggleProfile}  onSort={handleSort} onSearch={handleSearch} onChangeRangeEpi={handleChangeRangeEpi} handlehomeis={handleHomeis}/>


                            <EpiAlert open={epiAlertOpen} onToggleEpiAlert={handleToggleEpiAlert} onUpdateUserNewEpi={handleUpdateUserNewEpi}/>
                        </>
                    }
                    </>
                }  
                </>
            }
        </>

    );


}

export default Home;