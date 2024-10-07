import { h } from 'preact';

const Footer = () => (
	<footer class="text-black py-8 border-t border-solid border-black">
    <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between space-y-6 md:space-y-0">
            <div>
                <h3 class="text-lg font-semibold mb-4">ABDELRAZAQ.COM</h3>
            </div>

            <div>
                <ul>
                    <li><a href="#" class="text-gray-400 hover:text-black">Blog</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-black">Images</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-black">Image Tags</a></li>
                    <li><a href="#" class="text-gray-400 hover:text-black">Mood</a></li>
                </ul>
            </div>
        </div>
    </div>
</footer>

);

export default Footer;
