import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table';
import { Loader2, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/Badge';
import { Bot } from '@/api/types/bots';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { Button } from '@/components/ui/Button';

interface BotTableProps {
  bots: Bot[];
  isLoading: boolean;
  setSelectedBot: (b: Bot) => void;
  openEdit: () => void;
  openDelete: () => void;
}

export default function BotTable({
  bots,
  isLoading,
  setSelectedBot,
  openEdit,
  openDelete,
}: BotTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Назва</TableHead>
            <TableHead>Колекції</TableHead>
            <TableHead>Оновлено</TableHead>
            <TableHead>Промт бота</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={5}>
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              </TableCell>
            </TableRow>
          ) : bots.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>
                <div className="text-center py-6 text-muted-foreground">Ботів не знайдено</div>
              </TableCell>
            </TableRow>
          ) : (
            bots.map(bot => (
              <TableRow key={bot.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{bot.name}</p>
                    {bot.description && (
                      <p className="text-sm text-muted-foreground">{bot.description}</p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge key={bot.chromaCollection} variant="secondary">
                      {bot.chromaCollection}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{format(bot.updatedAt, 'd MMM, yyyy')}</TableCell>
                <TableCell>{bot.botPrompt}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Дії</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedBot(bot);
                          openEdit();
                        }}
                      >
                        <Pencil className="h-4 w-4 mr-2" />
                        Редагувати
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setSelectedBot(bot);
                          openDelete();
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Видалити
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
