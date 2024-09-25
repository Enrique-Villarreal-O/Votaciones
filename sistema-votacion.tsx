import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const Candidato = ({ nombre, onVote }) => (
  <Card className="w-24 h-24 flex items-center justify-center cursor-pointer" onClick={onVote}>
    <CardContent className="text-2xl font-bold">{nombre}</CardContent>
  </Card>
);

const TotalVotos = ({ total }) => (
  <Card className="col-span-2">
    <CardHeader className="font-bold text-xl">Total Votos</CardHeader>
    <CardContent className="text-3xl font-bold">{total}</CardContent>
  </Card>
);

const VotosIndividuales = ({ votos, mostrarPorcentaje }) => (
  <Card className="col-span-2 row-span-2">
    <CardHeader className="font-bold text-xl">Votos Individuales</CardHeader>
    <CardContent>
      {Object.entries(votos).map(([candidato, cantidad]) => {
        const porcentaje = (cantidad / Object.values(votos).reduce((a, b) => a + b, 0)) * 100;
        return (
          <div key={candidato} className="mb-2">
            {candidato}: {mostrarPorcentaje ? `${porcentaje.toFixed(2)}%` : cantidad}
          </div>
        );
      })}
    </CardContent>
  </Card>
);

const Filtro = ({ setMostrarPorcentaje, candidatosVisibles, setCandidatosVisibles }) => (
  <Card>
    <CardHeader className="font-bold text-xl">Ver</CardHeader>
    <CardContent>
      <RadioGroup defaultValue="total" onValueChange={(value) => setMostrarPorcentaje(value === 'porcentaje')}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="porcentaje" id="porcentaje" />
          <Label htmlFor="porcentaje">%</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="total" id="total" />
          <Label htmlFor="total">Total</Label>
        </div>
      </RadioGroup>
      <div className="mt-4">
        {Object.keys(candidatosVisibles).map((candidato) => (
          <div key={candidato} className="flex items-center space-x-2">
            <Checkbox
              id={candidato}
              checked={candidatosVisibles[candidato]}
              onCheckedChange={(checked) =>
                setCandidatosVisibles((prev) => ({ ...prev, [candidato]: checked }))
              }
            />
            <label htmlFor={candidato}>{candidato}</label>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const SistemaVotacion = () => {
  const [votos, setVotos] = useState({ C1: 0, C2: 0, C3: 0, C4: 0 });
  const [mostrarPorcentaje, setMostrarPorcentaje] = useState(false);
  const [candidatosVisibles, setCandidatosVisibles] = useState({
    C1: true,
    C2: true,
    C3: true,
    C4: true,
  });

  const handleVote = (candidato) => {
    setVotos((prev) => ({ ...prev, [candidato]: prev[candidato] + 1 }));
  };

  const totalVotos = Object.values(votos).reduce((a, b) => a + b, 0);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-4 gap-4 mb-4">
        {Object.keys(votos).map((candidato) => (
          <Candidato
            key={candidato}
            nombre={candidato}
            onVote={() => handleVote(candidato)}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Filtro
          setMostrarPorcentaje={setMostrarPorcentaje}
          candidatosVisibles={candidatosVisibles}
          setCandidatosVisibles={setCandidatosVisibles}
        />
        <TotalVotos total={totalVotos} />
        <VotosIndividuales
          votos={votos}
          mostrarPorcentaje={mostrarPorcentaje}
        />
      </div>
    </div>
  );
};

export default SistemaVotacion;
