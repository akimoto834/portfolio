import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Button, Box, Grid, Icon, Stack, Avatar} from '@mui/material';
import Typography from '@mui/material/Typography';
type Props = {
    inputReplyText: string;
    windowWidth: number;
    replyPost: Post;
    onWriteReplyText:  (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onPostReplyPost:  () => void
}

export const ReplyInput = (props: Props) => {
    return(
        <div>
            <Card sx={{ width: props.windowWidth, margin: 0, color: "black", backgroundColor: '#ACABA1'}}>
                            <CardContent>
                                <Stack direction="row" spacing={2}>
                                    <Avatar alt="Remy Sharp" src="post.user_idの写真のパス" /> {/**アバター */}
                                    <Stack direction="column">
                                        <Typography textAlign="left"> {/*name*/}
                                            {props.replyPost.user_id === 1 ? "take" : "aki"} {props.replyPost.time} {props.replyPost.epi}話
                                        </Typography>
                                        <Typography textAlign="left"> {/*ポストの本文*/}
                                            {props.replyPost.body}
                                        </Typography>
                                    </Stack>
                                </Stack>            
                            </CardContent>
                            <CardActions> {/*カードのアクションを配置するためのコンテナー*/}
                           
                            </CardActions>
                            <Box //mui使用時にスタイルやレイアウトを調整できる
                                m={0}//マージン
                                p={1}//パディング
                                bgcolor='#ACABA1' //color
                            >
                                <Grid container spacing={2}>
                                    <Grid item>
                                        <FormControl variant="standard" >
                                            <InputLabel htmlFor="input-with-icon-adornment" >
                                                コメント
                                            </InputLabel>
                                            <Input
                                                id="input-with-icon-adornment"
                                                startAdornment={//コメントのアイコン
                                                    <InputAdornment position="start">
                                                        <AccountCircle />
                                                    </InputAdornment>
                                                }

                                                multiline//複数行可能に
                                                placeholder="コメント.."//薄く文字を表示
                                                onChange={(e)=>props.onWriteReplyText(e)}
                                                value = {props.inputReplyText}//入力フィールドの値
                                                sx={{ width: props.windowWidth}} // 入力欄の幅を80文字に設定
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <Box
                                            bgcolor=""
                                            padding={1}
                                        >
                                            <Button //投稿ボタン
                                                aria-label="form-add"
                                                color="primary"
                                                onClick={props.onPostReplyPost}
                                            >
                                                        返信
                                            </Button>
                                        </Box>
                                    </Grid>
                                </Grid>                
                            </Box>
            </Card>
            
        </div>
        
    )
}