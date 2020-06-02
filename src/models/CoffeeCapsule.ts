import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import CoffeeCapsuleToCupSize from './CoffeeCapsuleToCupSize';
import CoffeeCupSize from './CoffeeCupSize';

@Entity('coffee_capsules')
class CoffeeCapsule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  mark: string;

  @Column()
  description: string;

  @Column()
  intensity: number;

  // @OneToMany(() => CoffeeCapsuleToCupSize, size => size.coffeeCupSizeId)
  // coffeeCupSize: CoffeeCapsuleToCupSize[] | null;

  @OneToMany(
    () => CoffeeCupSize,
    coffeeCapsuleToCupSize => coffeeCapsuleToCupSize.capsules,
  )
  @JoinTable({
    name: 'coffee_capsules_coffee_cup_sizes',
    // joinColumn: { name: 'coffeeCapsuleId', referencedColumnName: 'id' },
  })
  @JoinColumn({ name: 'id' })
  cupSizes: CoffeeCupSize[];

  @Column()
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default CoffeeCapsule;
