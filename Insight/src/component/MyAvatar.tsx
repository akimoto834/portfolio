import React, { useState } from "react";
import { Avatar } from "@mui/material";
import ModeIcon from '@mui/icons-material/Mode';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';

type Props = {
    AvatarImage: string
    user:User
    profiles: MyProfile[]
    onInputFile: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const MyAvatar = (props: Props) => {

    return(
        <div>
            {/* ラベルとして Avatar をクリックすると、関連付けられたファイル選択用の input 要素がクリックされる */}
            {/*<label htmlFor="avatar-input"> を使用して、Avatar コンポーネントをクリックした際に
                関連付けられた input 要素（id="avatar-input"）がクリックされるようにしている*/}
            <label htmlFor="avatar-input">
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}//重なり位置の指定
                    badgeContent={
                        //borderRadius プロパティを使用して、ボックスの角を丸くすることができます。'50%' を指定すると、円形の背景になります。
                        //p プロパティは、Box コンポーネントのパディング
                        <Box sx={{ borderRadius: '50%', bgcolor: '#2196f3', p: 1}}>
                            <ModeIcon sx={{ fontSize: 25, color: '#fff' }} />
                        </Box>
                    }
                >
                    <Avatar
                        sx={{ width: 150, height: 150, cursor: 'pointer' }}
                        alt="User Avatar"
                        src={props.profiles[props.user.id].icon} // 選択された画像またはデフォルトのアバターを表示
                    
                    />
                </Badge>
            </label>
            <input
                id="avatar-input"
                type="file"
                accept="image/*"
                onChange={props.onInputFile}
                style={{ display: 'none' }}
            />
        </div>
    );
}