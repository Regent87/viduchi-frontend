import styles from './Security.module.css'

export const Security = () => {


    return (
        <div className={styles.security}>
            <form>
                <div className={styles.changePassword}>
                <label htmlFor="password">
                    Новый пароль
                </label>
                <input type="password" />
                </div>

                <div className={styles.changePassword}>
                <label htmlFor="password">
                    Повторите пароль
                </label>
                <input type="password" />
                </div>
               

                <button className={styles.apply}>Сменить пароль</button>
            </form>
        </div>
    )
}