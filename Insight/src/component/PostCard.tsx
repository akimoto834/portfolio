import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, Box, Grid, Icon, Stack, Avatar} from '@mui/material';
import Typography from '@mui/material/Typography';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ReplyIcon from '@mui/icons-material/Reply';
import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';

type Props = {
    posts: Post[];
    user: User;
    windowWidth: number;
    isChild: boolean
    marginLeft: number
    userNewEpi: number
    firstEpi: number
    lastEpi: number
    AvatarImage: string
    profiles: MyProfile[]
    onPost: () => void;
    onGood: (post: Post)=> void;
    onSerchUserGood: (post: Post) => boolean;//あるpostをログインしているユーザがgoodしたかどうか
    onOpenReply: (post: Post) => void;
    onGetChildComment: (post: Post) => Post[];
    onGetChildrenComment: (post: Post) => Post[]
    onReply: (post: Post) => void
    onCountGood: (post: Post) => number
    onGetUserName: (user_id: number) => string
    onToggleProfile: (user_id: number) => void
}

export const PostCard = (props: Props) => {
    return(
        <div>
            {/*タイムラインのメイン部分*/}
            {props.posts.map((post: Post) => {
                 return (post.epi <= props.userNewEpi && //投稿は自身の最新話以下
                         post.userNewEpi<=props.userNewEpi && //投稿は投稿された時点で自分より先を読んでる人は表示されない
                         props.firstEpi<= post.epi && post.epi <= props.lastEpi  && //指定された範囲内の投稿のみ表示
                         (post.id===post.father_id || props.isChild)) &&//おおもとの親投稿なら表示　再帰的に呼び出されたときisChild=trueより返信欄に表示　これがないと返信の投稿も一つの普通の投稿として扱われる
                    <div>
                        <Card sx={{ width: props.windowWidth, margin: 0, color: "black", backgroundColor: "#ACABA1"}}>
                            <CardContent style={{marginLeft: props.marginLeft}}>
                                <Stack direction="row" spacing={2} >                    
                                    <Avatar alt="Remy Sharp" src={props.profiles[post.user_id].icon} onClick={() => props.onToggleProfile(post.user_id)}/> 
                                    <Stack direction="column">
                                        <Typography textAlign="left" style={{color: "#5A5E5D"}}> {/*name*/}
                                            {props.onGetUserName(post.user_id)} {post.time} {post.title}{post.epi}話
                                        </Typography>
                                        <Typography textAlign="left" whiteSpace="pre-wrap" style={{ wordBreak: 'break-word' }}> {/*ポストの本文 whiteSpaceで入力時の開業を反映*/}
                                            {post.body}
                                        </Typography>
                                    </Stack>
                                </Stack>            
                            </CardContent>
                            <CardActions style={{marginLeft: props.marginLeft}}> {/*カードのアクションを配置するためのコンテナー*/}
                                {/*いいねボタンの処理 */}
                                <Button size="small" onClick={() => props.onGood(post)}>
                                  {props.onSerchUserGood(post) ? (<ThumbUpAltIcon style={{ color: '387324' }}> </ThumbUpAltIcon>) : (<ThumbUpOffAltIcon style={{ color: '5A5E5D' }}></ThumbUpOffAltIcon>) }
                                </Button>
                                {props.onCountGood(post)>0 && props.onCountGood(post)}
                                {props.onGetChildComment(post).length >0 &&
                                    <Button onClick={() => props.onOpenReply(post)} style={{color: "#5A5E5D"}}>
                                        {props.onGetChildrenComment(post).length}件の返信
                                    </Button>
                                }
                                <Button size="small" onClick={()=> props.onReply(post)}>
                                   <ReplyIcon style={{ color: '5A5E5D' }}></ReplyIcon>
                                </Button>
                            </CardActions>
                            {/*<Divider style={{ backgroundColor: 'white' }} />*/}
                            { post.reply && //各ポストが返信を開いてるかどうか　再帰的に呼び出し
                                <div>
                                    <PostCard 
                                        posts={props.onGetChildComment(post)}
                                        user={props.user}
                                        windowWidth={props.windowWidth}
                                        isChild={true}
                                        marginLeft={props.marginLeft+50}
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
                                </div>
                                 
                            }
                        </Card>
                       
                    </div>

                        
            })}
        </div>
    )
}