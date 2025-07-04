import { Injectable } from '@angular/core';
import AgoraRTC, { IAgoraRTCClient, ILocalTrack, IRemoteTrack,IMicrophoneAudioTrack ,IRemoteVideoTrack,ICameraVideoTrack,NetworkQuality} from 'agora-rtc-sdk-ng';
// import { IRemoteUser } from 'agora-rtc-sdk-ng';
type IRemoteUser = {
  uid: string;
  hasAudio: boolean;
  hasVideo: boolean;
};


@Injectable({
  providedIn: 'root'
})
export class AgoraService {
  // private appId = 'cd3814a3bce243f79852379e333c6738';  // Replace with your Agora App ID
  // private token = '007eJxTYHDKqHoepfVqz6fu23pO8zYoqTgdOMUkcWn58shsj33v078oMCSnGFsYmiQaJyWnGpkYp5lbWpgaGZtbphobGyebmRtbnG4/lO5983B6zrkHTIwMjAwsQAwCTGCSGUyyQMmS1IoSUYbEvPTUnNT0xBwjA4f03MTMHL3k/FwAKOkptw==';  // Token if required (use for secured access)
  private client: IAgoraRTCClient;
  private localTracks: ILocalTrack[] = [];
  private localAudioTrack: IMicrophoneAudioTrack | null = null;
  private localVideoTrack: ICameraVideoTrack | null = null;
  private remoteUsers: { [uid: string]: IRemoteUser } = {};
   private remoteVideoTracks: { [uid: number]: IRemoteVideoTrack } = {};

  constructor() {
    this.client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8', role: 'host', networkConfig: { networkProfile: 'communication' } });

  }

  async joinChannel(channelName, uid, live_token, live_appId) {

    console.log('channelName',channelName);
    console.log('uid',uid);
    console.log('live_token',live_token);
    console.log('live_appId',live_appId);

    await this.client.join(live_appId, channelName, live_token, uid);

    this.monitorNetworkQuality();

    // Create local video & audio tracks
    const [localAudioTrack, localVideoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
   
    // await this.localVideoTrack.setEncoderConfiguration("120p");

    if (this.localVideoTrack) {
      await this.localVideoTrack.setEncoderConfiguration("360p"); // ✅ Ensure it's set only if exists
    }

    this.localTracks.push(localAudioTrack, localVideoTrack);
    console.log("Microphone and Camera started.");
    console.log("this.localTracks.",this.localTracks);

    // Publish local tracks to the channel
    await this.client.publish(this.localTracks);

    console.log("✅ Local user published");

    return { localVideoTrack, localAudioTrack };
  }

  listenForRemoteUsers(remoteVideoContainer: HTMLElement) {
    // alert(user,mediaType);

    this.client.on('user-published', async (user, mediaType) => {

        console.log(`👥 Remote user joined: ${user.uid}`);

      await this.client.subscribe(user, mediaType);

     console.log(`✅ Subscribed to ${mediaType} of user ${user.uid}`);

      if (mediaType === 'video') {
        const remoteVideoTrack = user.videoTrack;
        const videoElement = document.createElement('div');
        videoElement.id = `user-${user.uid}`;
        videoElement.style.width = '500px';
        videoElement.style.height = '240px';
        remoteVideoContainer.appendChild(videoElement);
        remoteVideoTrack.play(videoElement);
        // alert(videoElement);
      }

      if (mediaType === 'audio') {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play(); // Ensure audio plays
      }

    });

    // this.localTracks.videoTrack = await AgoraRTC.createCameraVideoTrack();
    // this.localTracks.audioTrack = await AgoraRTC.createMicrophoneAudioTrack();

    this.client.on('user-unpublished', (user) => {
      console.log(`🚪 Remote user left: ${user.uid}`);

      delete this.remoteUsers[user.uid];
      delete this.remoteVideoTracks[user.uid];


      const videoElement = document.getElementById(`user-${user.uid}`);
      if (videoElement) videoElement.remove();
    });
  }


 monitorNetworkQuality() {
    this.client.on("network-quality", async (quality: NetworkQuality) => {
      console.log("📡 Network Quality:", quality);

      // Handle local user network quality
      if (quality.uplinkNetworkQuality >= 4) {
        console.warn("⚠️ Poor local network detected! Reducing video quality...");
        await this.localVideoTrack?.setEncoderConfiguration("160p"); // Lower resolution
      } else {
        console.log("✅ Good network! Setting video quality to high.");
        await this.localVideoTrack?.setEncoderConfiguration("480p");
      }

     // Handle remote users' network quality
       Object.values(this.remoteUsers).forEach(async (user) => {

         const remoteUser = user as any;
        if (user && user.hasVideo && remoteUser.videoTrack) {

          const remoteVideoTrack = remoteUser.videoTrack; 
          if (quality.downlinkNetworkQuality >= 5) {
            console.warn(`⚠️ Poor network for remote user ${user.uid}! Stopping their video.`);

            await remoteUser.videoTrack.setEnabled(false);
          } else {
            await remoteUser.videoTrack.setEnabled(true);
          }
        }
      });
    });

    // Handle connection drops
    this.client.on("connection-state-change", (curState) => {
      if (curState === "DISCONNECTED") {
        console.warn("⚠️ Connection lost. Rejoining...");
        // this.rejoinChannel();
      }
    });
  }


  //  async rejoinChannel() {
  //   await this.client.leave();
  //   setTimeout(async () => {
  //     await this.client.join(this.appId, this.channel, this.token, this.uid);
  //     await this.startLocalVideoCall();
  //   }, 3000);
  // }


  async leaveChannel() {
    this.localTracks.forEach(track => track.stop());
    this.localTracks.forEach(track => track.close());
    this.localTracks = [];

    await this.client.leave();
  }
}
