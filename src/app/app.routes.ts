import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AccountComponent } from './account/account.component';
import { BudgetComponent } from './budget/budget.component';
import { PayeeComponent } from './payee/payee.component';
import { CategoryComponent } from './category/category.component';
import { TransactionComponent } from './transaction/transaction.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ShellComponent } from './shell/shell.component';

export const routes: Routes = [
    {
        path: 'sign-up',
        title: 'Signup',
        component: SignupComponent,
    },
    {
        path: 'login',
        title: 'Login',
        component: LoginComponent,
    },
    {
        path: '',
        component: ShellComponent,
        children: [
            {
                path: '',
                title: 'About',
                component: AboutComponent,
            },
            {
                path: 'account/:id_account',
                title: 'Accounts',
                component: AccountComponent,
            },
            {
                path: 'accounts',
                title: 'All accounts',
                component: AccountComponent,
            },
            {
                path: 'budget',
                title: 'Budget',
                component: BudgetComponent,
            },
            {
                path: 'payee',
                title: 'Payees',
                component: PayeeComponent,
            },
            {
                path: 'category',
                title: 'Categories',
                component: CategoryComponent,
            },
            {
                path: 'transaction',
                title: 'Transactions',
                component: TransactionComponent,
            },
            {
                path: 'user',
                title: 'User profile',
                component: UserComponent,
            }
        ]
    },
];
