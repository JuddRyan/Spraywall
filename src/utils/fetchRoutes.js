import { supabase } from './supabase';

const fetchRoutes = async (setState) => {
	const { data } = await supabase
		.from('routes')
		.select()
		.order('created_at', { ascending: false })
		.limit(5);
	if (setState) return setState(data);

	return data;
};

export default fetchRoutes;
