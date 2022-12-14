import { useRouter } from 'next/router';
import type { NextPage } from 'next'
import LayoutProfile from '@/ui/LayoutProfile'
import Banner from '@/ui/Banner'
import { useEffect, useState } from 'react';


const Chaza: NextPage = () => {
	const router = useRouter();
	const { id } = router.query;
	const [chazaInfo, setChazaInfo] = useState(null);

	useEffect(() => {
		async function f(){
			const chaza = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chazaId?id=${id}`).
			then(res => res.json());
			const comentarios_id = chaza.comentarios;
			const comentarios = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comentario?chaza_id=${id}`).then(res => res.json());
			chaza.comentarios = comentarios;
			console.log(comentarios);
			chaza.uid = id;
			setChazaInfo(chaza);
		}
		f();
	}, [id])

	return (
		chazaInfo ? (
		<LayoutProfile chaza={chazaInfo} >
		</LayoutProfile>
		) : (
			<div>
				<h1>Chaza no encontrada</h1>
			</div>
		)

	)
}
export default Chaza;