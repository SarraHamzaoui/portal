import { Routes } from '@angular/router';
import { GestionUserComponent } from './admin/gestion-user/gestion-user.component';
import { DashBoardAdminComponent } from './admin/dash-board-admin/dash-board-admin.component';
import { LoginComponent } from './login/login/login.component';
import { EmailComponent } from './admin/email/email.component';
import { ChatComponent } from './chat/chat.component';
import { NewsComponent } from './admin/news/news.component';
import { DashBoardUserComponent } from './user/dash-board-user/dash-board-user.component';
import { AuthGuard } from './auth.guard';
import { notloggedInGuard } from './notlogged-in.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full',
        canActivate: [notloggedInGuard]
    },
    //admin
    {
        path: 'dashBoardAdmin',
        component: DashBoardAdminComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'gestionUser',
                pathMatch: 'full'
            },
            {
                path: 'gestionUser',
                component: GestionUserComponent,
            },
            {
                path: 'chat',
                component: ChatComponent
            },
            {
                path: 'email',
                component: EmailComponent
            },
            {
                path: 'news',
                component: NewsComponent
            },
        ],
    },

    //user
    {
        path: 'dashBoardUser',
        component: DashBoardUserComponent,
        canActivate: [AuthGuard]
        // children: [
        //     {
        //         path: '',
        //         redirectTo: 'gestionUser',
        //         pathMatch: 'full'
        //     },
        //     {
        //         path: 'gestionUser',
        //         component: GestionUserComponent,
        //     },
        //     {
        //         path: 'chat',
        //         component: ChatComponent
        //     },
        //     {
        //         path: 'email',
        //         component: EmailComponent
        //     },
        //     {
        //         path: 'news',
        //         component: NewsComponent
        //     },
        // ],
    },








];