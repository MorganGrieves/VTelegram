import React from 'react';
import '@happysanta/vk-app-ui/dist/vkappui.css';
import {Welcome, Line, Button, P, Progress, Header, Gray, PromoCard, FormLayout, Input, Textarea, Box } from "@happysanta/vk-app-ui";

const divStyle = {
  float: 'right'
};
function VTImportListItem() {
  return (
    <PromoCard>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{flex: 1}}>
          <Header>В "Название чата"!</Header>
          <P><Gray>Собираем данные из чата ВК</Gray></P>
		  <Progress percent={0.33}/>
        </div>
        <div>
          <Button mode="tertiary" left={true}>Отменить</Button>
        </div>
      </div>
    </PromoCard>
  );
}

export default VTImportListItem;