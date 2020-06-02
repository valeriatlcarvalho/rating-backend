import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import CoffeeCapsule from './CoffeeCapsule';
import CoffeeCupSize from './CoffeeCupSize';

@Entity('coffee_capsules_coffee_cup_sizes')
class CoffeeCapsuleToCupSize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  coffeeCapsuleId: string;

  @Column()
  coffeeCupSizeId: string;

  @ManyToOne(() => CoffeeCapsule)
  @JoinTable({
    name: 'coffee_capsules',
    // joinColumn: { name: 'coffeeCapsuleId' },
  })
  @JoinColumn({ name: 'coffeeCapsuleId' })
  coffeeCapsule: CoffeeCapsule;

  @ManyToOne(() => CoffeeCupSize)
  @JoinTable({
    name: 'coffee_cup_sizes',
    // joinColumn: { name: 'coffeeCupSizeId' },
  })
  @JoinColumn({ name: 'coffeeCupSizeId' })
  coffeeCupSize: CoffeeCupSize;
}

export default CoffeeCapsuleToCupSize;
