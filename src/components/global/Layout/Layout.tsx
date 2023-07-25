import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'
import classes from './Layout.module.scss'

interface LayoutType {
	title: string
	description: string
	keywords: string
}

const Layout: FC<PropsWithChildren<LayoutType>> = ({ title, keywords, description, children }) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no'
				/>
				{keywords ? (
					<meta
						name='keywords'
						content={keywords}
					/>
				) : null}
				{description ? (
					<meta
						name='description'
						content={description}
					/>
				) : null}
			</Head>

			<div className={classes.Main}>{children}</div>
		</>
	)
}

export default Layout
