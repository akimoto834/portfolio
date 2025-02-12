import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';


type Props = {
  user: User
  sort: Sort
  firstEpi: number
  lastpi: number
  searchOpen: boolean
  searchText: string
  title: Title
  AvatarImage: string
  profiles: MyProfile[]
  onToggleSelectEpi: () => void
  onSort: (e: SelectChangeEvent) => void
  onSearch: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onChangeRangeEpi: () => void 
  handlehomeis: () => void
  onToggleProfile: (user_id: number) => void
}

export const UpBar = (props: Props) =>  {
  


  return (
    <div>
      <Box //mui使用時にスタイルやレイアウトを調整できる
        position="fixed"//固定して配置すること示す
        top={0}
        m={0}//マージン
        p={0}//パディング
        // bgcolor="#f0f0f0" 
        width="100%"
     >
        <AppBar position="static">
          <Toolbar style={{ backgroundColor: '#7EC677' }}>
            <Grid container spacing={0}  justifyContent="space-between"  alignItems="center"> {/**alignItems="centerで縦方向に揃える */}             
              <Grid item>{/**xsは幅の割合 */}
                <Button 
                  sx={{ width: '100px', 
                        ':hover': {backgroundColor: '#387324', // ホバー時の背景色
                                   color: 'white', // ホバー時の文字色
                                   },
                        color: "black",
                      }} 
                  style={{margin: 2}} variant="outlined" href="#outlined-buttons" color='inherit' onClick={() => props.handlehomeis()}
                >
                  タイトル選択
                </Button>
                <Button 
                  sx={{ width: '10px', 
                    ':hover': {backgroundColor: '#387324', // ホバー時の背景色
                               color: 'white', // ホバー時の文字色
                               },
                    color: "black",
                  }} 
                  style={{margin: 2}} variant="outlined" href="#outlined-buttons" color='inherit' onClick={props.onToggleSelectEpi}
                >
                  話数選択
                </Button>
                {/*<Button sx={{ width: '100px', height: "60px"}}  style={{margin: 2}} variant="outlined" href="#outlined-buttons" color='inherit' onClick={props.onSearch}>
                  <SearchIcon   />検索
                </Button>*/}
                
              </Grid>
              <Grid item>
                <Typography style={{fontSize: 20 ,width: 240, color: "black"}}>{props.title.title_name}</Typography>
              </Grid>
              <Grid item>
                <Typography style={{fontSize: 20 ,width: 240, color: "black"}}>{props.firstEpi}話から{props.lastpi}話までの<br />考察・感想</Typography>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Stack direction="row" alignItems="center">
                      <SearchIcon sx={{color: "black"}}></SearchIcon>
                      <TextField id="outlined-basic" label="検索" variant="outlined" style={{margin: 10, width:500, color: "black"}} value={props.searchText} onChange={props.onSearch}/>
                      <Button sx={{ width: '10px', color: "black" }} style={{margin: 2}} variant="outlined" href="#outlined-buttons" color='inherit' onClick={props.onChangeRangeEpi}>
                        検索
                      </Button>
                  </Stack>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      value={props.sort}//表示する値
                      id="demo-simple-select"
                      label="Sort"
                      onChange={props.onSort}//onChange プロパティに渡す関数 (handleSortChange) は、イベントオブジェクトを自動的に受け取ります。そのため、追加の引数を明示的に渡す必要はない
                      style={{ width:200, maxWidth: '100%'}}// maxWidth: '100%' は、Selectコンポーネントが親要素の幅を超えないように制限
                    >
                      <MenuItem value={"old" as Sort}>古い順(投稿日)</MenuItem>
                      <MenuItem value={"new" as Sort}>新しい順(投稿日)</MenuItem>
                      <MenuItem value={"old_story" as Sort}>古い順(話数)</MenuItem>
                      <MenuItem value={"new_story" as Sort}>新しい順(話数)</MenuItem>
                      <MenuItem value={"good" as Sort}>人気順</MenuItem>
                      <MenuItem value={"recommend" as Sort}>おすすめ順</MenuItem>
                    </Select>
                  </FormControl>
                  <Avatar 
                      sx={{ width: 56, height: 56 }}
                      onClick={()=>props.onToggleProfile(props.user.id)}//プロフィール編集画面に遷移するようにする
                      src={props.profiles[props.user.id].icon || '/default-avatar.png'}
                  >
                    
                  </Avatar>
                </Stack>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
    
  );
}