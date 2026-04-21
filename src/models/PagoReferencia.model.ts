import { Table, Column, Model, DataType, Default } from 'sequelize-typescript'

@Table({
    tableName: 'pagos_referencia',
    timestamps: false
})
class PagoReferencia extends Model {
    @Column({
        type: DataType.STRING(50),
        allowNull: false,
        unique: true
    })
    declare folio: string

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare valido: boolean
}
export default PagoReferencia
