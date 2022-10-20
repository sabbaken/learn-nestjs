import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';
import { USER_NOT_FOUND, WRONG_PASSWORD } from '../src/auth/auth.constants';

const loginDto: AuthDto = {
  email: 'kirill5@ya.ru',
  password: '1234'
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  // let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // const { body } = await request(app.getHttpServer())
    //   .post('/auth/login')
    //   .send(loginDto);
    // token = body.access_token;
  });


  it('/auth/login (POST) - success', async () => {
    return request(app.getHttpServer())
      .post('/auth/login/')
      .send(loginDto)
      .expect(200)
      .expect(({ body }: request.Response) => {
        expect(body.access_token).toBeDefined();
      });
  });

  it('/auth/login (POST) - fail wrong password', async () => {
    return request(app.getHttpServer())
      .post('/auth/login/')
      .send({ ...loginDto, password: 'wrong password' })
      .expect(401)
      .expect(({ body }: request.Response) => {
        expect(body.message).toEqual(WRONG_PASSWORD);
      });
  });

  it('/auth/login (POST) - fail user not found', async () => {
    return request(app.getHttpServer())
      .post('/auth/login/')
      .send({ ...loginDto, email: 'wrong_eamil@gmail.com' })
      .expect(401)
      .expect(({ body }: request.Response) => {
        expect(body.message).toEqual(USER_NOT_FOUND);
      });
  });

  afterAll(() => {
    disconnect();
  });
});
