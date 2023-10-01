import TodoList from '@/components/todo-list/todo-list';
import Container from '@/components/ui/container';
import Header from '@/components/ui/header';

export default function Home() {
  return (
    <Container>
      <Header />
      <TodoList />
    </Container>
  );
}
