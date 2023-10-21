import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

import { User } from './User.entity';
import { PageLink } from './PageLink.entity';

export enum PageScrapeStatus {
  SCRAPING = 'SCRAPING',
  SCRAPED = 'SCRAPED',
  ERROR = 'ERROR',
}

@Entity({ name: 'pages' })
export class Page extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column({ nullable: true })
  title?: string;

  @Column({ default: 0 })
  linksCount: number;

  @Column({
    type: 'enum',
    enum: PageScrapeStatus,
    default: PageScrapeStatus.SCRAPING,
  })
  status: PageScrapeStatus;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => PageLink, (pageLink) => pageLink.page)
  links: PageLink[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt?: Date;
}
