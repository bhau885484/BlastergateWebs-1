import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallCanactivechildService } from './api-service/service/all-api-service/callcanactivechild.service';
import { HomeComponent } from './components/home/home.component';
const routes: Routes = [

{
	path:'',
	pathMatch: 'full',
	loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) 
},

{
	path:'signup',
	 loadChildren: () => import('./components/auth/signup/signup.module').then(m => m.SignupModule) 
},
{
	path:'forgot-password',
	 loadChildren: () => import('./components/auth/forgot/forgot.module').then(m => m.ForgotModule) 
},
{
	path:'forgot-username',
	 loadChildren: () => import('./components/auth/forgot-username/forgot-username.module').then(m => m.ForgotUsernameModule) 
},
{
	path:'login',
	 loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) 
},
{
	path:'reset',
	 loadChildren: () => import('./components/auth/reset/reset.module').then(m => m.ResetModule) 
},
{
	path:'home',
	 loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule) 
},
{
	path:'feedback',
	 loadChildren: () => import('./components/chat/feedback/feedback.module').then(m => m.FeedbackModule) 
},
{
	path:'pay',
	 loadChildren: () => import('./components/auth/pay/pay.module').then(m => m.PayModule) 
},
{
	path:'single-profile',
	 loadChildren: () => import('./components/account/single-profile/single-profile.module').then(m => m.SingleProfileModule) 
},
{
	path:'link-expire',
	 loadChildren: () => import('./components/account/link-expire/link-expire.module').then(m => m.LinkExpireModule) 
},
{
	path:'view-couple-profile',
	 loadChildren: () => import('./components/account/view-couple-profile/view-couple-profile.module').then(m => m.ViewCoupleProfileModule) 
},
{
	path:'view-single-profile',
	 loadChildren: () => import('./components/account/view-single-profile/view-single-profile.module').then(m => m.ViewSingleProfileModule) 
},

{
	path:'couple-profile',
	 loadChildren: () => import('./components/account/couple-profile/couple-profile.module').then(m => m.CoupleProfileModule) 
},
{
	path:'location',
	 loadChildren: () => import('./components/account/location/location.module').then(m => m.LocationModule) 
},
{
	path:'online',
	 loadChildren: () => import('./components/account/online/online.module').then(m => m.OnlineModule) 
},
{
	path:'who-i-viewed',
	 loadChildren: () => import('./components/account/who-i-viewed/who-i-viewed.module').then(m => m.WhoIViewedModule) 
},
{
	path:'viewed-me',
	 loadChildren: () => import('./components/account/viewed-me/viewed-me.module').then(m => m.ViewedMeModule) 
},
{
	path:'feed',
	 loadChildren: () => import('./components/account/feed/feed.module').then(m => m.FeedModule) 
},
{
	path:'friend',
	 loadChildren: () => import('./components/account/friend/friend.module').then(m => m.FriendModule) 
},
{
	path:'friend-request',
	 loadChildren: () => import('./components/account/friend-request/friend-request.module').then(m => m.FriendRequestModule) 
},
{
	path:'likes',
	 loadChildren: () => import('./components/account/likes/likes.module').then(m => m.LikesModule) 
},

{
	path:'blocked',
	 loadChildren: () => import('./components/account/blocked/blocked.module').then(m => m.BlockedModule) 
},
{
	path:'privacy',
	 loadChildren: () => import('./components/account/privacy/privacy.module').then(m => m.PrivacyModule) 
},
{
	path:'notes',
	 loadChildren: () => import('./components/account/notes/notes.module').then(m => m.NotesModule) 
},
{
	path:'events',
	 loadChildren: () => import('./components/account/events/events.module').then(m => m.EventsModule) 
},
{
	path:'event-details',
	 loadChildren: () => import('./components/account/event-details/event-details.module').then(m => m.EventDetailsModule) 
},
{
	path:'search-result',
	 loadChildren: () => import('./components/account/search-result/search-result.module').then(m => m.SearchResultModule) 
},
{
	path:'remember',
	 loadChildren: () => import('./components/account/remember/remember.module').then(m => m.RememberModule) 
},
{
	path:'my-account',
	 loadChildren: () => import('./components/account/my-account/my-account.module').then(m => m.MyAccountModule) 
},

{
	path:'view-image',
	 loadChildren: () => import('./components/account/view-image/view-image.module').then(m => m.ViewImageModule) 
},

{
	path:'single-user-profile',
	 loadChildren: () => import('./components/user/single-user-profile/single-user-profile.module').then(m => m.SingleUserProfileModule) 
},
{
	path:'couple-user-profile',
	 loadChildren: () => import('./components/user/couple-user-profile/couple-user-profile.module').then(m => m.CoupleUserProfileModule) 
},

{
	path:'new-member',
	 loadChildren: () => import('./components/user/new-member/new-member.module').then(m => m.NewMemberModule) 
},
{
	path:'view-pay-per-click',
	 loadChildren: () => import('./components/pay-per-click/view-pay-per-click/view-pay-per-click.module').then(m => m.ViewPayPerClickModule) 
},
{
	path:'view-user-pay-per-click',
	 loadChildren: () => import('./components/pay-per-click/view-user-pay-per-click/view-user-pay-per-click.module').then(m => m.ViewUserPayPerClickModule) 
},
{
	path:'view-user-video',
	 loadChildren: () => import('./components/pay-per-click/view-user-video/view-user-video.module').then(m => m.ViewUserVideoModule) 
},
{
	path:'view-user-photo',
	 loadChildren: () => import('./components/pay-per-click/view-user-photo/view-user-photo.module').then(m => m.ViewUserPhotoModule) 
},

{
	path:'add-pay-per-click',
	 loadChildren: () => import('./components/pay-per-click/add-pay-per-click/add-pay-per-click.module').then(m => m.AddPayPerClickModule) 
},
{
	path:'edit-pay-per-click',
	 loadChildren: () => import('./components/pay-per-click/edit-pay-per-click/edit-pay-per-click.module').then(m => m.EditPayPerClickModule) 
},
{
	path:'add-pay-per-review',
	 loadChildren: () => import('./components/pay-per-click/add-review/add-review.module').then(m => m.AddReviewModule) 
},
{
	path:'view-pay-per-review',
	 loadChildren: () => import('./components/pay-per-click/view-review/view-review.module').then(m => m.ViewReviewModule) 
},
{
	path:'messenger',
	 loadChildren: () => import('./components/chat/messenger/messenger.module').then(m => m.MessengerModule) 
},

{
	path:'live-chat',
	 loadChildren: () => import('./components/chat/live-chat/live-chat.module').then(m => m.LiveChatModule) 
},
{
	path:'videos',
	 loadChildren: () => import('./components/user/videos/videos.module').then(m => m.VideosModule) 
},
{
	path:'speed-date',
	 loadChildren: () => import('./components/user/speed-date/speed-date.module').then(m => m.SpeedDateModule) 
},
{
	path:'validation',
	 loadChildren: () => import('./components/user/validation/validation.module').then(m => m.ValidationModule) 
},
{
	path:'validation-request',
	 loadChildren: () => import('./components/account/validation-request/validation-request.module').then(m => m.ValidationRequestModule) 
},
{
	path:'add-speed-date',
	 loadChildren: () => import('./components/user/add-speed-date/add-speed-date.module').then(m => m.AddSpeedDateModule) 
},
{
	path:'book-event-user',
	 loadChildren: () => import('./components/account/book-event-user/book-event-user.module').then(m => m.BookEventUserModule) 
},
{
	path:'membership',
	 loadChildren: () => import('./components/user/membership/membership.module').then(m => m.MembershipModule) 
},
{
	path:'payment-success',
	 loadChildren: () => import('./components/user/payment-success/payment-success.module').then(m => m.PaymentSuccessModule) 
},

{
	path:'event-payment-success',
	 loadChildren: () => import('./components/payment/event-payment-success/event-payment-success.module').then(m => m.EventPaymentSuccessModule) 
},

{
	path:'event-payment-failed',
	 loadChildren: () => import('./components/payment/event-payment-failed/event-payment-failed.module').then(m => m.EventPaymentFailedModule) 
},


// {
// 	path:'contact-us',
// 	 loadChildren: () => import('./components/contact/contact.module').then(m => m.ContactModule) 
// },
// {
// 	path:'about-us',
// 	 loadChildren: () => import('./components/about/about.module').then(m => m.AboutModule) 
// },
// {
// 	path:'life-skill',
// 	 loadChildren: () => import('./components/life-skill/life-skill.module').then(m => m.LifeSkillModule) 
// },
// {
// 	path:'facilities',
// 	 loadChildren: () => import('./components/facilities/facilities.module').then(m => m.FacilitiesModule) 
// },
// {
// 	path:'academic-program',
// 	 loadChildren: () => import('./components/academic-program/academic-program.module').then(m => m.AcademicProgramModule) 
// },
// {
// 	path:'rules-of-discipline',
// 	 loadChildren: () => import('./components/rules-of-discipline/rules-of-discipline.module').then(m => m.RulesOfDisciplineModule) 
// }

{
	path:'my-account',
	 loadChildren: () => import('./components/my-account/my_account.module').then(m => m.MyAccountModule),
	 canActivateChild: [CallCanactivechildService]
},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
