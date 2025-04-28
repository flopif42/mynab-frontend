import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { withInterceptorsFromDi, HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';

import { RootComponent } from './app/root.component';
import { AboutComponent } from './app/about/about.component';
import { AccountComponent } from './app/account/account.component';
import { BudgetComponent } from './app/budget/budget.component';
import { PayeeComponent } from './app/payee/payee.component';
import { CategoryComponent } from './app/category/category.component';
import { TransactionComponent } from './app/transaction/transaction.component';
import { UserComponent } from './app/user/user.component';
import { LoginComponent } from './app/login/login.component';
import { SignupComponent } from './app/signup/signup.component';
import { ShellComponent } from './app/shell/shell.component';
import { AuthInterceptor } from './app/utils/log-auth-interceptor.service'

bootstrapApplication(RootComponent, {
    providers: [
        provideRouter([
            {
                path: '',
                title: 'About',
                component: AboutComponent,
            },
            {
                path: 'login',
                title: 'Login',
                component: LoginComponent,
            },
            {
                path: 'sign-up',
                title: 'Signup',
                component: SignupComponent,
            },
            {
                path: '',
                component: ShellComponent,
                children: [
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
                        title: 'User settings',
                        component: UserComponent,
                    }
                ]
            },
        ]
        ),
        provideHttpClient(
            withInterceptorsFromDi(),
        ),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ]
})
.catch((err) => console.error(err));
