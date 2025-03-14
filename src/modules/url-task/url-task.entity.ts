import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UrlTaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  status: 'NEW' | 'PROCESSING' | 'DONE' | 'ERROR';

  @Column({ nullable: true })
  http_code: number;
}
