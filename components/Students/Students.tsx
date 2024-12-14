import styles from './Students.module.css'

export const Students = () => {

    return (
        <table className={styles.students}>
  <tr>
    <th>Ученик</th>
    <th>Должность</th>
    <th>Номер телефона</th>
    <th>E-mail</th>
    <th>Назначенные проекты</th>
  </tr>
  <tr>
    <td>Александр Изотов</td>
    <td>Электрик</td>
    <td>+37529788888</td>
    <td>izotov@gmail.com</td>
    <td>Проект 1, Мой проект</td>
  </tr>
  <tr>
    <td>Антон Осипов</td>
    <td>Электрик</td>
    <td>+37529788888</td>
    <td>osipov@gmail.com</td>
    <td>Мой проект</td>
  </tr>
</table>
    )
}