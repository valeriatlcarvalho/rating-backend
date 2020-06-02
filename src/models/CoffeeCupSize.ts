import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import CoffeeCapsuleToCupSize from './CoffeeCapsuleToCupSize';
import CoffeeCapsule from './CoffeeCapsule';

@Entity('coffee_cup_sizes')
class CoffeeCupSize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @OneToMany(
    () => CoffeeCapsule,
    coffeeCapsuleToCupSize => coffeeCapsuleToCupSize.cupSizes,
  )
  @JoinTable({
    name: 'coffee_capsules_coffee_cup_sizes',
    // joinColumn: { name: 'coffeeCapsuleId', referencedColumnName: 'id' },
  })
  @JoinColumn({ name: 'id' })
  capsules: CoffeeCapsule[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default CoffeeCupSize;
