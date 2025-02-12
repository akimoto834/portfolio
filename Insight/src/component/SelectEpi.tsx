import React from "react";
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import AccountCircle from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


import Badge from '@mui/material/Badge';
import MoodBadSharpIcon from '@mui/icons-material/MoodBadSharp';
// モジュールとカラーのインポート
import { styled } from '@mui/material/styles';
import { indigo, lightBlue, pink, red } from '@mui/material/colors';
import { colors, Stack } from "@mui/material";
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';



type Props = {
    selectEpiOpen: boolean;  
    title: Title
    chapter: Chapter[]
    windowWidth: number
    userNewEpi: number
    firstEpiInput: number
    lastEpiInput: number
    chapButton: string
    books: Book[]
    bookNum: string
    searchText: string
    onToggleSelectEpi: ()=>void;
    onChangeFirstEpi: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onChangelastEpi: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSelectChapter: (s:string) => void;
    onChangeRangeEpi: () => void 
    onBookNumChange: (e? :SelectChangeEvent) => void
    onSearch: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

// ドロワー内リストの幅をカスタマイズ
const DrawerList = styled('div')(() => ({//drawerlistを定義
    backgroundColor: "#ABB1A9",//リストの背景
    height: 100000,
}));

// ドロワーヘッダーのサイズ・色などをカスタマイズ
const DrawerHeader = styled('div')(() => ({
    height: 270,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1em',
    backgroundColor: "#7DCB7B",
    color: 'black',//文字の色
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, sans-serif',
}));


// ヘッダー内に表示するアバターのカスタマイズ
const DrawerAvatar = styled(Avatar)(({ theme }) => ({
    backgroundColor: pink[500],
    width: theme.spacing(6),
    height: theme.spacing(6),
  }));


export const SelectEpi = (props: Props) => {
    return(
        <Drawer
            variant="temporary"
            open={props.selectEpiOpen}
            onClose={props.onToggleSelectEpi}
        >
            {/* カスタムパーツ DrawerList */}
            <DrawerList role="presentation" style={{width: props.windowWidth > 600 ? 600: props.windowWidth} }>
                {/* ヘッダーとアバター */}
                <DrawerHeader>

                    <Typography  sx={{fontSize: "45px"}}>{props.title.title_name}</Typography>
                    <Stack direction="row">
                        
                        <TextField  
                           placeholder = {props.userNewEpi.toString()}
                           value={props.firstEpiInput}
                           onChange={(e)=>props.onChangeFirstEpi(e)}
                           type="text" 
                           inputProps={{inputMode: 'numeric', style: { fontSize: "30px", width: 100},}}/>
                        <Typography  sx={{fontSize: "45px"}}>話 ～</Typography>
                        <TextField  
                           placeholder = {props.userNewEpi.toString()}
                           value={props.lastEpiInput}
                           onChange={(e)=>props.onChangelastEpi(e)}
                           type="text" 
                           inputProps={{inputMode: 'numeric', style: { fontSize: "30px", width: 100},}}/>
                        <Typography  sx={{fontSize: "45px"}}>話 </Typography>
                    </Stack>
                    <Stack direction="row"  alignItems="center">{/**alignItems="centerで縦方向に揃える */}
                        <SearchIcon></SearchIcon>
                        <TextField id="outlined-basic" label="検索" variant="outlined" style={{margin: 10, width:500}} value={props.searchText} onChange={props.onSearch}/>
                    </Stack>
                    <Grid container spacing={10}  justifyContent="center">              
                        <Grid item>{/**xsは幅の割合 */}
                            <Button 
                                onClick={()=>props.onToggleSelectEpi()}//ドロワーの開閉
                                style={{ display: 'block', marginLeft: '0',}}
                                sx={{':hover': {backgroundColor: '#387324', // ホバー時の背景色
                                               color: 'white', // ホバー時の文字色
                                               },
                                    color: "black",
                                  }} 
                                variant="outlined"
                                size="large"
                            >
                                戻る
                            </Button>
                        </Grid>
                        <Grid item>{/**xsは幅の割合 */}
                            <Button 
                                onClick={()=>props.onChangeRangeEpi()}//ドロワーの開閉
                                style={{ display: 'block', marginLeft: '0' }}
                                sx={{':hover': {backgroundColor: '#387324', // ホバー時の背景色
                                                color: 'white', // ホバー時の文字色
                                                },
                                    color: "black",
                                }} 
                                variant="outlined"
                                size="large"
                            >
                                決定
                            </Button>
                        </Grid>
                    </Grid>
                </DrawerHeader>
                        
                <Stack direction="column"  alignItems="center">
                    <Button 
                        style={{
                            width: props.windowWidth > 600 ? 300: props.windowWidth/2,
                            backgroundColor: props.chapButton==="NewEpi" ? '#BAF8E5' : '#4EA188',
                            color: props.chapButton==="NewEpi" ? '#4EA188' : 'white',
                            margin: 30
                        }}
                        onClick={() => props.onSelectChapter("NewEpi")}
                        
                    >
                        <Typography>週刊誌最新話</Typography>
                    </Button>
                    <Button 
                        style={{
                            width: props.windowWidth > 600 ? 300: props.windowWidth/2,
                            backgroundColor: props.chapButton==="bookNewEpi" ? '#BAF8E5' : '#4EA188',
                            color: props.chapButton==="bookNewEpi" ? '#4EA188' : 'white',
                            margin: 15
                        }}
                        onClick={() => props.onSelectChapter("bookNewEpi")}
                        
                    >
                        <Typography>単行本最新巻</Typography>
                    </Button>  
                    <FormControl>{/*巻数表示*/}
                        {/*<InputLabel id="demo-simple-select-helper-label">巻数</InputLabel>*/}
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={props.bookNum}//表示する値
                            onChange={(e) => props.onBookNumChange(e)}
                            onOpen={(e) => props.onBookNumChange()}
                            style={{
                                width: props.windowWidth > 600 ? 300: props.windowWidth/2,
                                backgroundColor: props.chapButton==="book" ? '#BAF8E5' : '#4EA188',
                                color: props.chapButton==="book" ? '#4EA188' : 'white',
                                margin: 15
                            }}
                        >
                            {props.books.map((book)=>{
                                return <MenuItem key={book.book_num} value={book.book_num}>{book.book_num}巻</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                    <Button 
                        style={{
                            width: props.windowWidth > 600 ? 300: props.windowWidth/2,
                            backgroundColor: props.chapButton==="all" ? '#BAF8E5' : '#4EA188',
                            color: props.chapButton==="all" ? '#4EA188' : 'white',
                            margin: 15
                        }}
                        onClick={() => props.onSelectChapter("all")}
                        
                    >
                        <Typography>全話</Typography>
                    </Button>
                    {props.chapter.map((chap) => {
                        return props.userNewEpi>=chap.last_epi &&//userの読んでる最新話がある編の最新話を超えてる場合
                         <Button 
                            style={{
                                width: props.windowWidth > 600 ? 300: props.windowWidth/2,
                                backgroundColor: props.chapButton===chap.chap_name ? '#BAF8E5' : '#4EA188',
                                color: props.chapButton===chap.chap_name ? '#4EA188' : 'white',
                                margin: 15
                            }}
                            onClick={() => props.onSelectChapter(chap.chap_name)}
                        >
                            <Typography>{chap.chap_name}</Typography>
                        </Button>
                    })}
                </Stack>
            </DrawerList>
            
        </Drawer>
    )
}