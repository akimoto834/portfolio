import React from "react";
import Avatar from '@mui/material/Avatar';

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { Card, colors, Stack } from "@mui/material";
import TextField from '@mui/material/TextField';
import { MyAvatar } from "./MyAvatar";

type Props = {
    user:User
    profiles: MyProfile[]
    userRead: UserRead[]
    selfIntroInput: string
    userNameInput: string
    AvatarImage: string
    onToggleProfileEdit: () => void
    onGetTitleName: (title_id:number, epi:number) => string[]
    onSelfIntro:  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onUserName: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onInputFile: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const ProfileEdit = (props: Props) => {
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
                    <Button variant="outlined" style={{ marginRight: 15 }} onClick={props.onToggleProfileEdit}>
                        プロフィールを保存する
                    </Button>
                </Stack>            
                <Stack
                    direction="row"
                    spacing={10}
                    alignItems="center"//アイテムの垂直方向の中央揃え
                    justifyContent="center"// 水平方向の中央揃え
                    style={{width: window.innerWidth}}
                >
                    <MyAvatar user={props.user} profiles={props.profiles} AvatarImage={props.profiles[props.user.id].icon} onInputFile={props.onInputFile}/>
                    <TextField placeholder="名前" label="名前" variant="outlined" value={props.userNameInput} onChange={(e)=>props.onUserName(e)}/>
                </Stack>
                
                <TextField placeholder="自己紹介" label="自己紹介" multiline variant="outlined" value={props.selfIntroInput} onChange={(e)=>props.onSelfIntro(e)} style={{width: window.innerWidth-30, margin: 20}}/>
                <Divider style={{backgroundColor:"white"}}></Divider>
                {props.userRead.map((val: UserRead)=>{
                    return <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: 100, marginTop: 10}}>{/**flex:〇で比率を指定 */}
                          
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
                                     <Card style={{ height: "100%",  fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#ACABA1"}} >
                                        {val.epi} 話
                                    </Card>
                                </div>
                                
                            </div>
                })}
                
            </Box>
            
            
</div>
    );

}