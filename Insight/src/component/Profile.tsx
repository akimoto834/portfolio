import React from "react";
import Avatar from '@mui/material/Avatar';

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

import CardMedia from '@mui/material/CardMedia';
import { Card, colors, Stack } from "@mui/material";


type Props = {
    user:User
    profiles: MyProfile[]
    userRead: UserRead[]
    AvatarImage: string
    ProfileID: number
    onToggleProfileEdit: () => void
    onToggleProfile: (user_id: number) => void
    onGetTitleName: (title_id:number, epi:number) => string[]
    onGetUserName: (user_id: number) => string
}
export const Profile = (props: Props) => {

    const logoURL: {[name:string] : string}={
        //"僕のヒーローアカデミア" : "https://www.seekpng.com/png/detail/25-259221_my-hero-academia-logo.png", 
        //"ONEPIECE": "https://www.wallpapertip.com/wmimgs/62-623110_499934-title-one-piece-logo-anime-one-piece.png",
        "呪術廻戦" : "/images/2.png"
        }
    return(
        <div>
            <Box //mui使用時にスタイルやレイアウトを調整できる
                position="fixed"//固定して配置すること示す
                top={10}
                m={0}//マージン
                p={0}//パディング
                width="100vw"
                height="100vh" // 高さを設定
                overflow="auto"
            >
                <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-end" // アイテムを右寄せにする
                    alignItems="center"
                >
                    <Button variant="outlined" style={{  marginRight: 15 }} onClick={() => props.onToggleProfile(-1)}>
                        戻る
                    </Button>
                    {props.ProfileID===props.user.id &&
                        <Button variant="outlined" style={{ marginRight: 15 }} onClick={props.onToggleProfileEdit}>
                            プロフィールを編集する
                        </Button>
                    }
                </Stack>            
                <Stack
                    direction="row"
                    spacing={10}
                    alignItems="center"//アイテムの垂直方向の中央揃え
                    justifyContent="center"// 水平方向の中央揃え
                    style={{width: window.innerWidth}}
                >
                    <Avatar 
                        sx={{ width: 150, height: 150 }}
                        src={props.profiles[props.ProfileID].icon || '/default-avatar.png'}
                        //onClick={props.onToggleSelectEpi}//プロフィール編集画面に遷移するようにする
                    >
                        
                    </Avatar>
                    <Typography style={{color: "white"}}>{props.onGetUserName(props.ProfileID)}</Typography>
                </Stack>
                <Typography style={{color: "white", margin: 40}} textAlign="left" whiteSpace="pre-wrap" >{props.profiles[props.user.id].body}</Typography>
                <Divider style={{backgroundColor:"white"}}></Divider>
                {props.userRead.map((val: UserRead)=>{
                    return <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: 100, marginTop: 10}}>{/**flex:〇で比率を指定 */}
                                {/*<div style={{ flex: 3,  marginRight: 10}}>
                                    <Card style={{ height: "100%"}}>
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            style={{ width: "100%", height: "100%" }}//画像の大きさを合わせる
                                            image={logoURL[props.onGetTitleName(val.title_id, val.epi)[0]]} //publicに置いた画像を/images/2.jpgでも参照できる
                                            alt="image not found"
                                        />
                                    </Card>
                                </div>*/}
                                <div style={{ flex: 4, marginRight: 10}}>
                                    {/**display: "flex": カードをフレックスボックスとして表示  alignItems: "center": 子要素を縦方向（交差軸）に中央揃え  justifyContent: "center": 子要素を横方向（主軸）にも中央揃え。 */}
                                    <Card style={{ height: "100%",fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ACABA1"}} >
                                         {props.onGetTitleName(val.title_id, val.epi)[0]}                             
                                    </Card>
                                </div>
                                <div style={{ flex: 4, marginRight: 10 }}>
                                    <Card style={{ height: "100%", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ACABA1"}} >
                                        {props.onGetTitleName(val.title_id, val.epi)[1]}
                                    </Card>
                                </div>
                                <div style={{ flex: 1,}}>
                                     <Card style={{ height: "100%", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ACABA1"}} >
                                        {val.epi} 話
                                    </Card>
                                </div>
                                
                            </div>
                })}
              
            </Box>
            
</div>
    );

}