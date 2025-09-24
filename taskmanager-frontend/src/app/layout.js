import '../app/globals.css';
import Header from './components/Header';

//export const metadata = {
//  title: "TaskManager Web",
//  description: "Manage tasks efficiently",
//};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
