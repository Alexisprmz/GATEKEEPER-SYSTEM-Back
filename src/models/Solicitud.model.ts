import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

@Table({
  tableName: 'solicitudes',
  timestamps: false
})
class Solicitud extends Model {
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true
  })
  declare email: string

  @Column({
    type: DataType.STRING(50),
    allowNull: false
  })
  declare folio: string

  @Default('Procesando')
  @Column({
    type: DataType.STRING(20),
    allowNull: false
  })
  declare estatus: string

  @Default(DataType.NOW)
  @Column({
    type: DataType.DATE
  })
  declare fecha_solicitud: Date
}

export default Solicitud