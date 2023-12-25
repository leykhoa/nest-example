// firebase-admin.service.ts
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
// import serviceAccount from '../../firebase-service.json';
@Injectable()
export class FirebaseAdminService {
  private firebaseAdmin: typeof admin;

  constructor() {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });

    this.firebaseAdmin = admin;
  }

  getAdmin() {
    return this.firebaseAdmin;
  }


  async createCustomToken(data: {
    userId: string;
    role: number;
  }): Promise<string> {
    return await this.getAdmin()
      .auth()
      .createCustomToken(data.userId, { role: data.role });
  }

  
  async verifyToken(idToken: string) {
    try {
      const decodedToken = await this.firebaseAdmin
        .auth()
        .verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      throw error;
    }
  }
}
