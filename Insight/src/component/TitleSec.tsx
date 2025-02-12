import { useState } from 'react';
import Button from '@mui/material/Button';

type Props = {
    genre: string;
    titlelist: Title[];
    selectedtitle: Title;
    settitle: (newTitle:number) => void;
    };
  
export const TitleSec = (props: Props) => {
    const filteredTitles = props.titlelist.filter(title => title.genre === props.genre);
    const getButtonColor = (title_id: number) => {
      return props.selectedtitle.title_id === title_id ? { backgroundColor: '#BAF8E5', color: 'black' } : { backgroundColor: '#4EA188', color: 'white' };
  };
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50vw', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
  {filteredTitles.map((title) => (
    <div 
      key={title.title_id} 
      className="title-button" 
      style={{ width: '18vw' }} 
      onClick={() => props.settitle(title.title_id)}>
      <Button fullWidth style={{ display: 'block' }} sx={getButtonColor(title.title_id)}>{title.title_name}</Button>
    </div>
  ))}
</div>
        </div>
    )
  }