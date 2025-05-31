import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    children: [
      {
        path: 'isciler',
        loadComponent: () => import('./isciler/isciler.component').then(m => m.IscilerComponent)
      },
      {
        path: 'urunler',
        loadComponent: () => import('./urunler/urunler.component').then(m => m.UrunlerComponent)
      },
      {
        path: 'gunluk-satislar',
        loadComponent: () => import('./satislar/satislar.component').then(m => m.SatislarComponent)
      },
      { path: 'harcamalar', loadComponent: () => import('./harcamalar/harcamalar.component').then(m => m.HarcamalarComponent) },
      {
        path: 'borclular',
        loadComponent: () => import('./borclular/borclular.component').then(m => m.BorclularComponent)
      }
      
      // diğer child rotalar...
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];
