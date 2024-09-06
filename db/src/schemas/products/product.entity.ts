import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 512 })
  name: string;

  @Column({ type: 'varchar', length: 512 })
  short_description: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0, nullable: true })
  discount: number;

  @Column({ type: 'int' })
  quality: number;

  @Column({ type: 'boolean', default: false })
  mark_as_new: boolean;

  @Column({ type: 'varchar' })
  cover_photo: string;

  @Column('text', { array: true, default: [] })
  additional_photos: string[];

  @Column('text', { array: true, default: [] })
  sizes: string[];

  @Column('text', { array: true, default: [] })
  colors: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
