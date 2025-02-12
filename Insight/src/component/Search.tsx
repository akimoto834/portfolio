import React from "react";
import { MyTimeline } from "./MyTimeline"
import { Timeline } from "@mui/icons-material";

type Props = {
    user: User;
    searchedPost: Post[];
    inputText: string;
    windowWidth: number;
    userNewEpi: number
    firstEpi: number
    lastEpi: number
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
}

export const Search = (props: Props) => {

    return(
        <div>
            <input></input>
            <MyTimeline
                user={props.user}
                posts={props.searchedPost} 
                inputText= {props.inputText}
                windowWidth={props.windowWidth}
                userNewEpi={props.userNewEpi}
                firstEpi={props.firstEpi}
                lastEpi={props.lastEpi}
                onPost={props.onPost}
                onWriteText={props.onWriteText}
                onGood={props.onGood}
                onSerchUserGood={props.onSerchUserGood}
                onOpenReply={props.onOpenReply}
                onGetChildComment={props.onGetChildComment}
                onGetChildrenComment={props.onGetChildrenComment}
                onReply={props.onReply}
                onChangeUser={props.onChangeUser}
                onCountGood={props.onCountGood}
            />
         </div>
    )
}