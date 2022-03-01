import React from 'react';
import VTLogo from './VTLogo';
import '@happysanta/vk-app-ui/dist/vkappui.css';
import {Welcome, Line, Button, P, Progress, Header, Gray, PromoCard, FormLayout, Input, Textarea, Box } from "@happysanta/vk-app-ui";

function VTWelcome() {
  return (
    <PromoCard>
      <Welcome
        header="VTelegram"
        icon={<VTLogo />}
        footer={<Button mode="primary">Начать</Button>}
        description="Чтобы начать передачу сообщений, откройте любой диалог ВК, нажмите на кнопку Импортировать и следуйте инструкциям."/>
    </PromoCard>
  );
};

export default VTWelcome;
