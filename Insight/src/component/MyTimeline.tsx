import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { PostCard } from './PostCard';

import { Button, Box, Grid, Icon, Stack, Avatar} from '@mui/material';

type Props = {
    user: User;
    posts: Post[];
    inputText: string;
    windowWidth: number;
    userNewEpi: number
    firstEpi: number
    lastEpi: number
    AvatarImage: string
    selectedtitle: Title
    profiles: MyProfile[]
    onPost: () => void;
    onWriteText: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onGood: (post: Post)=> void;
    onSerchUserGood: (post: Post) => boolean//あるpostをログインしているユーザがgoodしたかどうか
    onOpenReply: (post: Post) => void
    onGetChildComment: (post: Post) => Post[]
    onGetChildrenComment: (post: Post)=> Post[]
    onReply: (post: Post) => void
    onChangeUser: () => void
    onCountGood: (post: Post) => number
    onGetUserName: (user_id: number) => string
    onToggleProfile: (user_id: number) => void
    onPostPost:  () => void
    onGetPost: (title_id: number) => void
};

export const MyTimeline = (props: Props) => {
    const [boxHeight, setBoxHeight] = useState(0);
    const boxRef = useRef<HTMLDivElement>(null);//useRefフックを使用して、boxRefという参照を初期化 
    //<HTMLDivElement>という型パラメータを指定することで、boxRefがHTMLDivElement（通常の<div>要素）を指すことを明示

    const titleposts = props.posts.filter((item: Post) => item.title === props.selectedtitle.title_name)

    // useEffect を用いることで、コンポーネントのレンダー後に実行される様々な種類の副作用を実行できる
    useEffect(() => { //useEffect は第二引数に何を指定するかによって実行されるタイミングが異なる
        if (boxRef.current) {//boxRef.currentが存在するかどうかを確認
            setBoxHeight(boxRef.current.offsetHeight);//<Box>コンポーネントの高さを取得 offsetHeightは、要素の高さ（ボーダーを含む）をピクセル単位で返す
        }else {
            console.error("boxRef is not set correctly");
        }
    });//第二引数に何も指定しない場合は再レンダリング毎に実行


    

    return(
        <div> 
            <div style={{ paddingBottom: 30 ,marginTop: 120}}></div>
            {/*<Button
                onClick={()=>props.onChangeUser()}
            >
                UserChange
            </Button>*/}
            {/*タイムラインのメイン部分*/}
            <PostCard 
                posts={titleposts}
                user={props.user}
                windowWidth={props.windowWidth}
                isChild={false}
                marginLeft={0}
                userNewEpi={props.userNewEpi}
                firstEpi={props.firstEpi}
                lastEpi={props.lastEpi}
                AvatarImage={props.AvatarImage}
                profiles={props.profiles}
                onPost={props.onPost}
                onGood={props.onGood}
                onSerchUserGood={props.onSerchUserGood}
                onOpenReply={props.onOpenReply}
                onGetChildComment={props.onGetChildComment}
                onGetChildrenComment={props.onGetChildrenComment}
                onReply={props.onReply}
                onCountGood={props.onCountGood}
                onGetUserName={props.onGetUserName}
                onToggleProfile={props.onToggleProfile}
            />
           {/* タイムラインの下部にパディングを追加 */}
           <div style={{ paddingBottom: boxHeight}}></div>
            
            {/*新規投稿欄*/}
            <Box //mui使用時にスタイルやレイアウトを調整できる
                ref={boxRef}//boxRefにset
                position="fixed"//固定して配置すること示す
                bottom={0}//下に固定
                m={0}//マージン
                p={0}//パディング
                bgcolor="#ACABA1"
                width="100%"
                
            >
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item>
                        <Box marginBottom={2} height={2} width={props.windowWidth} bgcolor="black"></Box>{/*区切り線*/}
                        <FormControl variant="standard">
                            <InputLabel htmlFor="input-with-icon-adornment" style={{color: "black"}}>
                                コメント {props.userNewEpi}話まで読んでる
                            </InputLabel>
                            <Input
                                id="input-with-icon-adornment"
                                startAdornment={//コメントのアイコン
                                    <InputAdornment position="start" style={{color: "black"}}>
                                        <Avatar src={props.profiles[props.user.id].icon} style={{width:30, height: 30}}></Avatar>
                                    </InputAdornment>
                                }

                                multiline//複数行可能に
                                placeholder="コメント.."//薄く文字を表示
                                onChange={(e)=>props.onWriteText(e)}
                                value = {props.inputText}//入力フィールドの値
                                sx={{ width: props.windowWidth*0.9, color: "black"}} // 入力欄の幅を80文字に設定
                                style={{color: "black"}}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button //投稿ボタン
                                aria-label="form-add"
                                style={{color: "black"}}
                                onClick={() => props.onGetPost(props.selectedtitle.title_id)}
                                sx={{width: 200, fontSize: 18, margin:1}}
                        >
                                    更新
                        </Button>
                        <Button //投稿ボタン
                            aria-label="form-add"
                            style={{color: "black"}}
                            onClick={props.onPostPost}
                            sx={{width: 200, fontSize: 18, margin:1}}
                        >
                                    投稿
                        </Button>
                       
                    </Grid>
                </Grid>                
            </Box>
            
        </div>
    )
}